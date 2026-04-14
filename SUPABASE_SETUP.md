# Supabase setup

This project stores prototype feedback and live strings overrides through Vercel serverless endpoints:

- `/api/feedback`
- `/api/strings`

## 1. Create the table

Run the SQL from:

- `supabase/feedback.sql`
- `supabase/strings.sql`

in the Supabase SQL editor.

## 2. Configure Vercel environment variables

Add these environment variables to the `hlidacky-prototypes` Vercel project:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_FEEDBACK_TABLE`
- `SUPABASE_STRINGS_TABLE`

Recommended table name:

- `prototype_feedback`
- `prototype_strings`

## 3. Feedback payload fields stored

Each feedback submission stores:

- `prototype_key`
- `prototype_name`
- `prototype_path`
- `language`
- `active_tab`
- `feedback_text`
- `page_url`
- `submitted_from`
- `user_agent`
- `context` as `jsonb`

The `context` object currently includes:

- `prototype_label`
- `location`
- `radius`
- `applied_services`
- `route_kind`

## 4. Notes

- The client does not talk to Supabase directly.
- The write happens only on the server through `api/feedback.js`.
- Live strings overrides are loaded through `api/strings.js`.
- Keep `SUPABASE_SERVICE_ROLE_KEY` only in Vercel envs, never in client-side code.

## 5. Live strings overrides

The strings editor now stores one override row per:

- `prototype_key`
- `language`

Each row stores:

- `payload` as `jsonb`
- `touched_keys` as `text[]`
- timestamps

Static `strings*.js` files remain the fallback source bundled in the repo. Supabase values are applied on top at runtime, so text changes can go live without a new deploy.
