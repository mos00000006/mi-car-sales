(function () {
    'use strict';

    const SUPABASE_URL = 'https://euzzimaavoqmprigbxnd.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_LCh3q5lUckmSqdovX7Kwng_Zazv1_DJ';
    const WHATSAPP_NUMBER = '27710270924';

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[character]);
    }

    function firstPhoto(vehicle) {
        if (Array.isArray(vehicle.photos) && vehicle.photos.length) {
            return vehicle.photos[0];
        }

        return vehicle.image_url || 'pictures/logo.png';
    }

    function displayName(vehicle) {
        const make = String(vehicle.make || '').trim();
        const model = String(vehicle.model || '').trim();

        if (!make) return model;
        if (model.toLowerCase().startsWith(make.toLowerCase())) return model;
        return `${make} ${model}`.trim();
    }

    function formatPrice(value) {
        const price = Number(value || 0);
        return price > 0
            ? `R ${price.toLocaleString('en-ZA')}`
            : 'Price on request';
    }

    function enquiryUrl(vehicle) {
        const message = `Hi, I am interested in the ${displayName(vehicle)}` +
            (vehicle.stock_number ? ` (Stock ${vehicle.stock_number})` : '') + '.';

        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    function detailUrl(vehicle) {
        return vehicle.detail_page || vehicle.url || enquiryUrl(vehicle);
    }

    function card(vehicle) {
        const status = String(vehicle.status || 'available').toLowerCase();
        const statusLabel = status === 'reserved' ? '<span class="catalog-status">Reserved</span>' : '';
        const facts = [vehicle.year, vehicle.transmission, vehicle.fuel]
            .filter(Boolean)
            .map(escapeHtml)
            .join(' • ');
        const mileage = Number(vehicle.mileage || 0);
        const link = detailUrl(vehicle);
        const external = /^https?:\/\//i.test(link);

        return `
            <div class="car-card" data-make="${escapeHtml(vehicle.make || '')}" data-price="${Number(vehicle.price || 0)}">
                <div class="vehicle-image-wrap" style="position:relative;overflow:hidden;">
                    <img
                        src="${escapeHtml(firstPhoto(vehicle))}"
                        alt="${escapeHtml(displayName(vehicle))}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='pictures/logo.png';"
                    >
                    ${statusLabel}
                </div>
                <h3>${escapeHtml(displayName(vehicle))}</h3>
                <p class="price">${escapeHtml(formatPrice(vehicle.price))}</p>
                ${facts ? `<p>${facts}</p>` : ''}
                ${mileage ? `<p>${mileage.toLocaleString('en-ZA')} km</p>` : ''}
                <a href="${escapeHtml(link)}" class="details-btn"${external ? ' target="_blank" rel="noopener"' : ''}>
                    ${vehicle.detail_page ? 'View Details' : 'Enquire on WhatsApp'}
                </a>
            </div>
        `;
    }

    function currentVehicles(rows) {
        return rows.filter(vehicle => {
            const status = String(vehicle.status || 'available').toLowerCase();
            return vehicle.published !== false && !['sold', 'removed', 'deleted', 'unavailable'].includes(status);
        });
    }

    async function fetchVehicles() {
        if (!window.supabase) throw new Error('Vehicle database library did not load.');

        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data, error } = await client
            .from('vehicles')
            .select('stock_number,make,model,year,price,mileage,transmission,fuel,status,published,photos,image_url,detail_page');

        if (error) throw error;

        return currentVehicles(data || []).sort((left, right) =>
            String(right.stock_number || '').localeCompare(
                String(left.stock_number || ''),
                undefined,
                { numeric: true }
            )
        );
    }

    function refreshMakeFilter(vehicles) {
        const select = document.getElementById('makeFilter');
        if (!select) return;

        const makes = [...new Set(vehicles.map(vehicle => String(vehicle.make || '').trim()).filter(Boolean))]
            .sort((left, right) => left.localeCompare(right));

        select.innerHTML = '<option value="all">All Makes</option>' + makes
            .map(make => `<option value="${escapeHtml(make.toLowerCase())}">${escapeHtml(make)}</option>`)
            .join('');
    }

    async function renderVehicleCatalog() {
        const container = document.querySelector('section.cars');
        if (!container) return;

        container.innerHTML = '<div class="catalog-empty"><p>Loading current vehicles...</p></div>';

        try {
            const vehicles = await fetchVehicles();

            if (!vehicles.length) {
                container.innerHTML = '<div class="catalog-empty"><h3>No vehicles are currently listed.</h3><p>Please check again soon or contact us on WhatsApp.</p></div>';
                return;
            }

            container.innerHTML = vehicles.map(card).join('');
            refreshMakeFilter(vehicles);

            if (typeof window.searchCars === 'function') window.searchCars();
        } catch (error) {
            console.error('Live vehicle catalogue could not be loaded:', error);
            container.innerHTML = `
                <div class="catalog-empty">
                    <h3>We could not load the current vehicles.</h3>
                    <p>Please try again shortly or enquire on WhatsApp.</p>
                    <a class="details-btn" href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">
                        Contact M.I Car Sales
                    </a>
                </div>
            `;
        }
    }

    window.MICarCatalog = {
        fetchVehicles,
        renderVehicleCatalog,
        card,
        displayName,
        formatPrice,
        firstPhoto,
        detailUrl
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderVehicleCatalog);
    } else {
        renderVehicleCatalog();
    }
})();
