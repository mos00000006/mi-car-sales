alter table public.vehicles
    add column if not exists meta_product_id text,
    add column if not exists source text not null default 'website',
    add column if not exists last_synced_at timestamptz,
    add column if not exists meta_payload jsonb;

create unique index if not exists vehicles_meta_product_id_unique
    on public.vehicles (meta_product_id)
    where meta_product_id is not null;

create index if not exists vehicles_public_catalog_index
    on public.vehicles (published, status);
