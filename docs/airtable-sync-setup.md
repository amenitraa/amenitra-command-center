# Airtable Sync Setup

## Important First Step

If you pasted an Airtable token into chat, rotate it and create a fresh one before using it in production. Treat that token as exposed.

## Goal

Run Airtable sync server-side through Netlify so:

- Airtable credentials stay off the frontend
- the app keeps reading from Supabase
- `Industry Campaign` and `Tasks` can populate launches and task awareness automatically

## Files Added For This

- `netlify/functions/airtable-sync.js`
- `supabase/migrate-airtable-sync.sql`
- `docs/airtable-sync-plan.md`

## What This Sync Does

### `Industry Campaign`

Reads these rows:

- `Financial Services Campaign`
- `Life Sciences & Pharma Campaign`
- `New Logo: Eli Lilly (Life Sciences)`
- `New Logo: Capital One (FS)`
- `New Logo: State Farm (FS)`

Writes them into `launches` with richer metadata such as kickoff date, due date, progress, owner, and account slug.

### `Tasks`

Reads task rows and keeps the ones that are:

- assigned to Amenitra
- due soon
- clearly tied to State Farm, Capital One, Eli Lilly, Financial Services, or Life Sciences

Writes them into `tasks`.

## Netlify Environment Variables

Add these in Netlify under:

`Site configuration -> Environment variables`

- `AIRTABLE_TOKEN`
- `AIRTABLE_BASE_ID`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Use:

- `AIRTABLE_BASE_ID=appyeyhcsWAFLzpdh`
- `SUPABASE_URL` = your project URL
- `SUPABASE_SERVICE_ROLE_KEY` = the secret service role key from Supabase

Do not put these values in frontend files.

## Supabase Step

Run this SQL before using the sync:

- `supabase/migrate-airtable-sync.sql`

That adds the extra `tasks` and `launches` columns the sync uses.

## How To Trigger The Sync

After deployment, call:

`/.netlify/functions/airtable-sync`

Example:

- `https://your-site.netlify.app/.netlify/functions/airtable-sync`

It returns JSON with how many Airtable launches and tasks were synced.

## What To Expect

- `Automation Hub` will still be your visibility page
- `Tasks & Launches` will start reflecting Airtable-backed items after the sync runs
- `integration_settings` for Airtable will get a last synced time when the function succeeds

## Nice Next Step

Once the manual sync works, the best follow-up is scheduling it:

- daily for task awareness
- Monday morning before 7:00am EST for your weekly refresh
