# Airtable Sync Plan

## Goal

Read Airtable industry and account boards into Supabase so the app can refresh live account intelligence without manual copy/paste.

## Source Boards

- Financial Services industry board
- Life Sciences industry board
- Account boards tied to those industries

## Recommended Flow

1. Airtable API reads source records
2. A sync function maps Airtable fields into Supabase tables
3. Supabase becomes the app-facing source of truth
4. The app reads from Supabase, not directly from Airtable

## Why This Is Better

- Keeps the frontend simple
- Lets you normalize messy Airtable fields into cleaner app tables
- Makes Monday refresh jobs easier to run
- Avoids exposing Airtable credentials in the browser

## First Mapping Recommendation

### Airtable -> `accounts`

- Account Name -> `name`
- Industry -> `industry_id`
- Account Status -> `status`
- Revenue Target -> `revenue_target`
- Strategic Focus -> `focus`
- Market Position -> `market_position`
- Consultant Positioning -> `consultant_positioning`

### Airtable -> `account_stakeholders`

- Stakeholders / owners / key contacts -> one row per stakeholder

### Airtable -> `account_signals`

- Current account/company/industry updates -> one row per signal

### Airtable -> `account_pain_points`

- Pain hierarchy / known needs -> one row per ranked pain point

### Airtable -> `account_reminders`

- Meeting reminders / things to bring up next time -> one row per reminder

## What We Still Need From You

- Airtable base ID
- Table names or screenshots of the exact source tables/views
- The fields that should map into account intelligence
- Whether the sync should overwrite Supabase or only fill blanks

## Recommended Build Order

1. Confirm Airtable table/view names
2. Define field mapping
3. Build the sync function
4. Write sync results into Supabase
5. Surface sync status in Automation Hub
