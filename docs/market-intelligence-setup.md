# Market Intelligence Sync Setup

## Goal

Turn `Current Signals` and `Pain Hierarchy` into live intelligence with:

- real news/market source links
- short summaries
- why-it-matters framing
- strategic response guidance

## Files Added

- `supabase/migrate-market-intelligence.sql`
- `netlify/functions/market-intelligence-sync.js`

## Supabase Step

Run this SQL file first:

- `supabase/migrate-market-intelligence.sql`

It creates the `market_watch_items` table used by account and industry war rooms.

## Netlify Environment Variables

This sync only needs:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

It does not require a separate news API key in this version.

## How To Run It

After deploying the updated files, open:

`/.netlify/functions/market-intelligence-sync`

Example:

- `https://your-site.netlify.app/.netlify/functions/market-intelligence-sync`

## What It Updates

### Accounts

- `Bank of America`
- `State Farm`
- `Capital One`
- `Johnson & Johnson`
- `Eli Lilly`

### Industry War Rooms

- `Financial Services`
- `Life Sciences`
- `Tech`
- `Telecom`

## How The App Uses It

- `signal` items become `Current Signals`
- `pain` items become `Pain Hierarchy`

When live market-watch data exists, it overrides the older seeded sample items in the UI.

## Important Note

This version uses public news feeds to create the linked signal layer. It gives you real source URLs and live article-driven context, but the summaries and response guidance are still generated interpretation inside the sync layer.
