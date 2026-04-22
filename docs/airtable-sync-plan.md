# Airtable Sync Plan

## Goal

Read Airtable industry and account boards into Supabase so the app can refresh live account intelligence without manual copy/paste.

## Airtable Source

- Base ID: `appyeyhcsWAFLzpdh`
- Primary table/view for campaign sync: `Industry Campaign`
- Supporting table/view for task sync: `Tasks`

## Airtable Records In Scope

From `Industry Campaign`, sync these rows first:

- `Financial Services Campaign`
- `Life Sciences & Pharma Campaign`
- `New Logo: Eli Lilly (Life Sciences)`
- `New Logo: Capital One (FS)`
- `New Logo: State Farm (FS)`

These map into the app as:

- `Financial Services Campaign` -> Financial Services industry intelligence
- `Life Sciences & Pharma Campaign` -> Life Sciences industry intelligence
- `New Logo: Eli Lilly (Life Sciences)` -> `eli-lilly`
- `New Logo: Capital One (FS)` -> `capital-one`
- `New Logo: State Farm (FS)` -> `state-farm`

## Airtable Fields Confirmed So Far

### `Industry Campaign`

- `Project Name`
- `Status`
- `Owner`
- `Kickoff`
- `Due Date`
- `Task progress`
- `Project Manager`
- `Marketing Priorities`
- `Stakeholders`

### `Tasks`

- `Task`
- `Status`
- `Start Date`
- `Due Date`
- `Assignee`
- `# of...` (truncated in screenshot, full field name still unknown)
- `Team Function`
- `Task Link(s)`

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

## Concrete Mapping Recommendation

### `Industry Campaign` -> `accounts`

- `Project Name` -> used to identify the target industry or account row
- `Status` -> `status`
- `Marketing Priorities` -> `focus`
- `Stakeholders` -> related stakeholder rows if the Airtable field is populated as names
- `Owner` -> append to account notes or use as sync metadata if not meant to be a stakeholder
- `Project Manager` -> append to account notes or use as sync metadata

### `Industry Campaign` -> `launches`

- `Project Name` -> `title`
- `Kickoff` -> kickoff or launch timing note
- `Due Date` -> `note` or future `due_date` column if we add one
- `Status` -> `phase`
- `Owner` or `Project Manager` -> `owner`
- `Task progress` -> progress note attached to the launch

### `Industry Campaign` -> account and industry intelligence

- `Financial Services Campaign` and `Life Sciences & Pharma Campaign`
  - feed industry-level intelligence cards and planning context
  - can populate Strategy Lab notes, industry launch watch, and meeting prep context
- `New Logo: Eli Lilly (Life Sciences)`, `New Logo: Capital One (FS)`, `New Logo: State Farm (FS)`
  - feed account launch context
  - drive account-specific reminders and launch watch sections

### `Industry Campaign` -> `account_stakeholders`

- `Stakeholders` -> one related stakeholder row per person when present

### `Tasks` -> `tasks`

- `Task` -> `title`
- `Status` -> `status`
- `Start Date` -> future `start_date` column if we add one, or store as metadata for now
- `Due Date` -> `due_label` or future `due_date` column if we add one
- `Assignee` -> `owner` or `source_assignee` metadata
- `Team Function` -> task category / channel / workstream tag
- `Task Link(s)` -> linked resource URL
- `# of...` -> pending until we know the full field name

### `Tasks` -> meeting prep and reminders

- any task with a due date in the near term can surface in:
  - Home priorities
  - Account meeting prep
  - reminders to bring up next meeting

## Account Resolution Rules

The sync function should resolve Airtable rows to app records using `Project Name`:

- contains `Capital One` -> `capital-one`
- contains `State Farm` -> `state-farm`
- contains `Eli Lilly` -> `eli-lilly`
- equals `Financial Services Campaign` -> Financial Services industry layer
- equals `Life Sciences & Pharma Campaign` -> Life Sciences industry layer

Rows that do not match one of those names should be skipped for the first version of the sync.

## Suggested Sync Behavior

- Read-only from Airtable into Supabase
- Nightly or Monday morning refresh for campaign rows
- Manual `Scan Now` button in Automation Hub for testing
- Overwrite sync-managed campaign fields, but preserve manual strategic notes inside the app
- Log the last successful sync time into `integration_settings`

## What We Still Need

- Airtable personal access token or API access method
- Confirmation of whether `Stakeholders` is plain text, a linked record field, or collaborators
- The full field name behind `# of...` in the `Tasks` table
- Confirmation of whether the `Tasks` table should sync all rows or only filtered rows relevant to your work

## Recommended Next Build Step

1. Add a lightweight sync endpoint or serverless function that reads:
   - `Industry Campaign`
   - `Tasks`
2. Normalize those rows into a clean payload
3. Upsert the mapped fields into Supabase
4. Expose last sync time in Automation Hub
5. Add per-account task filtering once the relevant task naming pattern is confirmed
