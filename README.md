# Amenitra's Command Center

A private single-user marketing workspace for account strategy, meeting prep, channel planning, launches, goals, and weekly intelligence.

## What is included

- A deployable static starter app for Netlify
- A welcome page that greets Amenitra before entering the main workspace
- A polished powder-pink dashboard shell with sidebar navigation
- Seeded sample content for core accounts, priorities, and weekly signals
- A technical implementation spec for the full product build

## Current structure

- `index.html` - app shell and page layout
- `styles.css` - custom design system and styling
- `app.js` - UI rendering and interactions
- `data/sample-data.js` - starter data model
- `data/supabase-config.js` - browser-side Supabase connection config
- `docs/technical-spec.md` - build-ready product and engineering spec
- `docs/supabase-setup.md` - how to connect this app to Supabase
- `supabase/schema.sql` - starter database schema for the Supabase version
- `.env.example` - integration environment variable template
- `netlify.toml` - basic Netlify publish config

## How to deploy on Netlify

1. Push this folder to GitHub.
2. In Netlify, create a new site from that GitHub repo.
3. Set the publish directory to the repo root.
4. No build command is required for this starter version.

## Current backend direction

This repo now supports a browser-based Supabase connection layer that works without a build step in this environment.

That means:

- you can keep deploying this on Netlify as a static site
- the app can read and write editable data to Supabase
- local seeded mode still works until your Supabase config is filled in

## Current prototype capabilities

- Welcome screen before the main workspace
- Sidebar navigation across all major modules
- Account hub and account war rooms
- Editable account details saved in the browser
- Editable channel strategy cards
- Content activation tracking
- Meeting prep preview page
- Starter pages for tasks, goals, leadership, strategy, and automation
- Supabase-ready browser data service with local fallback
- SQL schema for the real app database

## Notes

This version is intentionally single-user and does not include authentication.
