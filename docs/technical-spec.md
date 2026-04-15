# Technical Implementation Spec

## Product Name

`Amenitra's Command Center`

## Product Summary

A private, single-user marketing operating system that helps Amenitra manage strategic accounts, industry priorities, active campaigns, meeting prep, launches, goals, AI recommendations, and weekly competitive/account intelligence.

The app reads from external systems like Airtable, Outlook, Teams, HubSpot, and external news sources, then stores and organizes that information inside the app. The app does not write back to Airtable.

## Core Experience

### Entry Flow

When the app opens, the user lands on a welcome screen first.

The welcome screen should:

- Show the title `Amenitra's Command Center`
- Greet the user with `Hello Amenitra`
- Surface urgent to-dos, launches, reminders, and any notable changes
- Include a primary CTA to enter the main workspace

After entering, the user lands on the Home dashboard.

### Visual Direction

- Background: light powder pink
- Typography: Poppins
- Text color: black
- Layout: elevated, polished, sidebar-based
- Tone: warm, strategic, confident
- Quotes: real quotes from women only

## Primary Modules

### 1. Welcome Page

Purpose:

- Greet the user
- Show immediate priorities before entering the workspace

Core elements:

- Hello Amenitra header
- Today summary
- Upcoming launches
- Action items
- Weekly focus note
- Enter button

### 2. Home Dashboard

Purpose:

- One-page snapshot of the business and workload

Core sections:

- Greeting and rotating quote
- Priority cards
- What changed since last refresh
- This week's launches
- Goals progress
- Quick links into key modules
- Account snapshot cards
- What Did I Miss feed

### 3. Accounts Hub

Purpose:

- Provide a portfolio-level view of all strategic accounts

Initial accounts:

- Bank of America
- State Farm
- Capital One
- Johnson & Johnson
- Eli Lilly

Fields shown:

- Revenue target
- Industry
- Stakeholders
- Health/status
- Last refresh
- Current strategic focus

### 4. Account Detail Page

Purpose:

- Act as an account war room before and between meetings

Editable sections:

- Account overview
- Stakeholders
- Revenue target
- Goals
- Market position
- Current signals
- Competitor landscape
- Industry/account pain points
- Consultant positioning
- Launches and campaigns
- Tasks and reminders
- Reminders for next meeting
- Weekly intelligence brief

Actions:

- Edit
- Refresh account
- Prep meeting

### 5. Channel Command

Purpose:

- View and manage channel strategy across 8 active channels

Channels:

- Paid Media
- Email & ABM
- Content & SEO
- Events & Field
- Philanthropy
- Web
- Creative
- Organic Social

Each channel includes:

- Current strategy
- Active campaigns
- Optimization ideas
- News/developments
- Account-specific plays
- Editable notes

### 6. Strategy Lab

Purpose:

- Generate strategic recommendations from account, campaign, and industry signals

Outputs:

- Channel optimization recommendations
- Competitor-driven strategic shifts
- Innovation ideas
- Consultant talking points
- Cross-account trends

### 7. Tasks & Launches

Purpose:

- Manage execution and follow-through

Features:

- Task list
- Launch pipeline
- Auto-generated reminders
- Post-launch follow-up scheduling
- Priority and due date tracking

### 8. Meetings

Purpose:

- Automate monthly account meeting prep

Flow:

- Select account
- Pull tasks, wins, launches, notes, and recent signals
- Pre-fill briefing form
- Generate agenda
- Generate Teams message
- Generate 2-slide in-app deck preview

Slide output:

- Slide 1: Performance Snapshot
- Slide 2: Strategic POV + What We Do Next

### 9. Goals & Wins

Purpose:

- Track goals, milestones, and achievements automatically

Features:

- Progress cards
- Win journal
- Achievement log
- Quarterly and monthly summaries

### 10. Leadership

Purpose:

- Coach consistent follow-through and leadership habits

Features:

- Follow-up prompts
- Stakeholder coaching reminders
- Post-launch nudges
- Leadership growth notes

### 11. Automation Hub

Purpose:

- Make all source scans and refreshes visible

Features:

- Source health
- Last sync time
- Monday refresh status
- Manual scan buttons
- Refresh logs

## Source Systems

### Airtable

Read only.

Primary data sources:

- Industry board for Financial Services
- Industry board for Life Sciences
- Account board records tied to those industries/accounts

Expected record shapes from screenshot:

- Project Name
- Status
- Owner
- Kickoff
- Due Date
- Task Progress
- Project Manager
- Marketing Priorities
- Stakeholders

### Outlook

Read email context for:

- Account updates
- Meeting notes
- Action items
- Follow-ups

### Teams

Read conversation context for:

- Decisions
- Reminders
- Meeting-related notes
- Items to bring up next meeting

### HubSpot

Read account and activity context for:

- Campaign/workflow performance
- Contact/account activity
- Data useful for meeting prep

### External News

Read current news for:

- acquisitions
- leadership changes
- product or business line expansion
- industry shifts
- competitor activity

## Automation Rules

### Weekly Scheduled Refresh

Schedule:

- Every Monday at 7:00am EST

Refresh scope for each account:

- Real-time account news
- Current signals
- Competitor intel
- Market position
- Pain signals
- Consultant talking points
- Meeting reminders
- Channel shifts

### Automatic Creation Rules

When the app detects tasks, launches, reminders, or follow-up items from its source systems, it should create them automatically inside the app.

No review queue is required for the initial version.

### Manual Refresh

Every account page should support a `Refresh Account` action that reruns intelligence generation for that account.

## Suggested Long-Term Architecture

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend

- Supabase Postgres
- Supabase Storage
- Scheduled jobs via Supabase Edge Functions or Netlify scheduled functions

### Integrations

- Airtable API
- Microsoft Graph API
- HubSpot API
- News aggregation/search provider

## Suggested Database Tables

- `industries`
- `accounts`
- `account_stakeholders`
- `account_signals`
- `account_news`
- `account_competitors`
- `account_pain_points`
- `account_strategy_shifts`
- `account_meeting_reminders`
- `channels`
- `channel_recommendations`
- `campaigns`
- `content_assets`
- `content_activations`
- `tasks`
- `launches`
- `goals`
- `wins`
- `meeting_preps`
- `meeting_outputs`
- `source_sync_logs`
- `refresh_runs`
- `quotes`

## MVP Build Plan

### Phase 1

- Welcome page
- Home dashboard
- Sidebar shell
- Accounts hub
- Account detail page
- Channel command
- Tasks & launches
- Meeting prep page
- Goals & wins
- Automation hub

### Phase 2

- Airtable live read integration
- Outlook and Teams ingestion
- HubSpot ingestion
- Source-linked news automation
- Weekly scheduled refresh implementation

### Phase 3

- AI-generated strategy recommendations
- In-app slide generation improvements
- Exportable meeting artifacts
- Advanced reporting and wins tracking

## Content Already Confirmed

### Industries

- Financial Services
- Life Sciences

### Accounts

- Bank of America
- State Farm
- Capital One
- Johnson & Johnson
- Eli Lilly

### Known Stakeholders

- Bank of America: Emily Outen, Lia Larson
- State Farm: Erin Meadows, Charlie Loveall, Rachel Peacock
- Capital One: Grace Han, Charlie Loveall, Rachel Peacock
- Johnson & Johnson: Ashley Nash, Katie Wasko
- Eli Lilly: Charlie Loveall, Katie Wasko
