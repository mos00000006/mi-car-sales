import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const jsonHeaders = {
    'content-type': 'application/json; charset=utf-8'
};

function response(body: unknown, status = 200) {
    return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function required(name: string) {
    const value = Deno.env.get(name);
    if (!value) throw new Error(`Missing required secret: ${name}`);
    return value;
}

function parsePrice(value: unknown) {
    if (typeof value === 'number') return value;
    const match = String(value || '').replace(/,/g, '').match(/[\d.]+/);
    return match ? Number(match[0]) : 0;
}

function parseYear(text: string) {
    const match = text.match(/\b(19|20)\d{2}\b/);
    return match ? Number(match[0]) : null;
}

function parseMileage(text: string) {
    const match = text.match(/([\d\s,.]+)\s*km\b/i);
    return match ? Number(match[1].replace(/[^\d]/g, '')) : 0;
}

function parseTransmission(text: string) {
    if (/\bautomatic\b|\bauto\b/i.test(text)) return 'Automatic';
    if (/\bmanual\b/i.test(text)) return 'Manual';
    return '';
}

function parseFuel(text: string) {
    if (/\bdiesel\b/i.test(text)) return 'Diesel';
    if (/\bpetrol\b/i.test(text)) return 'Petrol';
    if (/\belectric\b|\bev\b/i.test(text)) return 'Electric';
    if (/\bhybrid\b/i.test(text)) return 'Hybrid';
    return '';
}

function splitName(name: string) {
    const cleaned = name.trim();
    const knownMakes = [
        'Alfa Romeo', 'Aston Martin', 'Land Rover', 'Mercedes-Benz',
        'Mercedes Benz', 'Great Wall', 'Volkswagen', 'Chevrolet',
        'Mitsubishi', 'Hyundai', 'Renault', 'Toyota', 'Nissan',
        'Suzuki', 'Mazda', 'Honda', 'Ford', 'Kia', 'Opel', 'BMW',
        'Audi', 'Jeep', 'Volvo', 'Isuzu', 'Fiat', 'Lexus', 'Chery'
    ];
    const make = knownMakes.find(candidate =>
        cleaned.toLowerCase().startsWith(candidate.toLowerCase())
    ) || cleaned.split(/\s+/)[0] || '';
    const model = cleaned.slice(make.length).trim() || cleaned;

    return { make, model };
}

async function fetchAllProducts(catalogId: string, graphVersion: string, token: string) {
    const fields = [
        'id', 'retailer_id', 'name', 'description', 'price', 'currency',
        'availability', 'url', 'image_url', 'additional_image_urls'
    ].join(',');
    const products: Record<string, unknown>[] = [];
    let after = '';

    do {
        const url = new URL(`https://graph.facebook.com/${graphVersion}/${catalogId}/products`);
        url.searchParams.set('fields', fields);
        url.searchParams.set('limit', '100');
        if (after) url.searchParams.set('after', after);

        const result = await fetch(url, {
            headers: { authorization: `Bearer ${token}` }
        });
        const payload = await result.json();

        if (!result.ok || payload.error) {
            throw new Error(payload.error?.message || `Meta returned HTTP ${result.status}`);
        }

        products.push(...(payload.data || []));
        after = payload.paging?.cursors?.after || '';
        if (!payload.paging?.next) after = '';
    } while (after);

    return products;
}

Deno.serve(async request => {
    if (request.method !== 'POST') {
        return response({ error: 'Use POST.' }, 405);
    }

    try {
        const syncSecret = required('CATALOG_SYNC_SECRET');
        if (request.headers.get('x-catalog-sync-secret') !== syncSecret) {
            return response({ error: 'Unauthorized.' }, 401);
        }

        const supabaseUrl = required('SUPABASE_URL');
        const serviceRoleKey = required('SUPABASE_SERVICE_ROLE_KEY');
        const catalogId = required('META_CATALOG_ID');
        const accessToken = required('META_CATALOG_ACCESS_TOKEN');
        const graphVersion = required('META_GRAPH_VERSION');
        const syncedAt = new Date().toISOString();
        const db = createClient(supabaseUrl, serviceRoleKey, {
            auth: { persistSession: false }
        });

        const products = await fetchAllProducts(catalogId, graphVersion, accessToken);
        const currentIds = products.map(product => String(product.id));
        const rows = products.map(product => {
            const name = String(product.name || '').trim();
            const description = String(product.description || '').trim();
            const combined = `${name} ${description}`;
            const { make, model } = splitName(name);
            const availability = String(product.availability || '').toLowerCase();
            const isAvailable = !availability || availability.includes('in stock');
            const extraImages = Array.isArray(product.additional_image_urls)
                ? product.additional_image_urls.map(String)
                : [];
            const photos = [String(product.image_url || ''), ...extraImages].filter(Boolean);

            return {
                meta_product_id: String(product.id),
                stock_number: `META-${String(product.retailer_id || product.id)}`,
                source: 'meta',
                make,
                model,
                description,
                year: parseYear(combined),
                price: parsePrice(product.price),
                mileage: parseMileage(combined),
                transmission: parseTransmission(combined),
                fuel: parseFuel(combined),
                photos,
                image_url: photos[0] || null,
                status: isAvailable ? 'available' : 'sold',
                published: isAvailable,
                last_synced_at: syncedAt,
                meta_payload: product
            };
        });

        if (rows.length) {
            const { error: upsertError } = await db
                .from('vehicles')
                .upsert(rows, { onConflict: 'meta_product_id' });

            if (upsertError) throw upsertError;

            // Once Meta has supplied a checked catalogue, it becomes the
            // single public stock source. Legacy hard-coded rows stay in the
            // CRM history but no longer appear to customers.
            const { error: legacyError } = await db
                .from('vehicles')
                .update({ published: false })
                .neq('source', 'meta')
                .is('meta_product_id', null);

            if (legacyError) throw legacyError;
        }

        const { data: oldMetaRows, error: listError } = await db
            .from('vehicles')
            .select('id,meta_product_id')
            .eq('source', 'meta');

        if (listError) throw listError;

        const removedIds = (oldMetaRows || [])
            .filter(row => !currentIds.includes(String(row.meta_product_id)))
            .map(row => row.id);

        if (removedIds.length) {
            const { error: removeError } = await db
                .from('vehicles')
                .update({ published: false, last_synced_at: syncedAt })
                .in('id', removedIds);

            if (removeError) throw removeError;
        }

        return response({
            ok: true,
            synced: rows.length,
            removed: removedIds.length,
            synced_at: syncedAt
        });
    } catch (error) {
        console.error('Meta catalogue sync failed:', error);
        return response({
            error: error instanceof Error ? error.message : 'Catalogue sync failed.'
        }, 500);
    }
});
