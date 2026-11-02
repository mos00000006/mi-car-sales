# M.I Car Sales — WhatsApp and Website Catalogue Sync

The public website now reads live vehicle stock from the existing Supabase
`vehicles` table. The included `meta-catalog-sync` function copies the connected
Meta catalogue into that table. Cars that are changed in Meta are updated on the
website, and cars removed from Meta are unpublished from the website.

## Safe connection order

1. In Meta Business Suite, create or identify the catalogue owned by M.I Car
   Sales. The Facebook Page, catalogue, and WhatsApp number must belong to the
   same Business Manager.
2. Copy the current WhatsApp vehicle listings into that Meta catalogue before
   connecting it. Keep the current WhatsApp catalogue visible until the copy has
   been checked.
3. Apply `supabase/migrations/20261102_meta_catalog_sync.sql` to the existing
   Supabase project.
4. Deploy `supabase/functions/meta-catalog-sync` and set these secrets:

   - `META_CATALOG_ID`
   - `META_CATALOG_ACCESS_TOKEN`
   - `META_GRAPH_VERSION`
   - `CATALOG_SYNC_SECRET`

   Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to the
   function.
5. Run the function once and confirm that the same active vehicles appear on
   `vehicles.html`.
6. On the catalogue owner's phone, open **WhatsApp Business → Business tools →
   Catalogue → Catalogue settings → Connect catalogue**, select the verified
   Meta catalogue, and confirm.
7. Schedule the function to run every 15 minutes. Catalogue changes will then
   reach the website on the next sync.

## New stock process

After the connection, add, edit, hide, or remove vehicles in the connected Meta
catalogue. WhatsApp and the website will both follow that catalogue. Use a
unique retailer/product code for every car so updates match the correct vehicle.

Never put the Meta access token or the Supabase service-role key in website
JavaScript. They belong only in protected function secrets.
