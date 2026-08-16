# MiCarSales CRM

Open `crm.html` for the private CRM. It uses the connected Supabase project for shared live data and authentication.

## First manager account
1. In Supabase Authentication, create the manager user with email/password.
2. Copy the user's UUID.
3. In SQL editor run:
   `insert into public.profiles (id, full_name, role) values ('USER_UUID','Manager','manager');`
4. Sign in at `/crm.html`.

The public website is unchanged. The CRM is a separate private portal.
