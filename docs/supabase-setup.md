# Supabase Setup

## Goal

This project can now run in two modes:

- `Local Preview Mode`: uses the seeded data and browser storage
- `Supabase Connected`: reads and writes editable app data from Supabase

## Files To Know

- `data/supabase-config.js`
- `data/supabase-config.example.js`
- `supabase/schema.sql`

## Setup Steps

1. Create a Supabase project.
2. Open the SQL editor in Supabase.
3. Run the contents of `supabase/schema.sql`.
4. Copy `data/supabase-config.example.js` to `data/supabase-config.js`.
5. Replace the placeholder values with your real project URL and anon key.
6. Set `enabled: true`.

## Important Notes

- This app is single-user and currently uses the browser client directly.
- The anon key is expected to be public client-side.
- You should still configure sensible row-level security policies before using live data.
- Until the config is filled in, the app will stay in `Local Preview Mode`.

## What Syncs Right Now

The current integration layer is ready to read and persist:

- accounts
- account stakeholders
- account reminders
- account signals
- channels
- channel plays
- channel developments
- content assets
- content asset channel mappings
- goals
- tasks
- launches
- leadership prompts
- automation source status

## Current Save Behavior

Edits made in the UI will:

1. save locally in the browser immediately
2. attempt to save to Supabase if enabled

If Supabase save fails, the local change still remains visible in the browser.
