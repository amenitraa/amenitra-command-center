# Amenitra's Marketing Command Center — Deployment Guide

## What You're Deploying
Your full Marketing Command Center as a real web app with:
- Supabase (database — stores your accounts, tasks, goals, content)
- GitHub (code repository)
- Netlify (hosting — gives you a live URL)

---

## Step 1: Set Up Supabase (Your Database)

1. Go to **https://supabase.com** and sign up (free tier is plenty)
2. Click **"New Project"**
3. Name it: `amenitra-command-center`
4. Choose a strong database password (save it!)
5. Select region: **US East** (closest to Atlanta)
6. Click **Create Project** — wait ~2 minutes

### Get Your Supabase Credentials
Once the project is created:
1. Go to **Settings → API** (left sidebar)
2. Copy these two values (you'll need them later):
   - **Project URL** — looks like `https://xxxxx.supabase.co`
   - **anon/public key** — starts with `eyJ...`

### Create Your Database Tables
1. Go to **SQL Editor** in the left sidebar
2. Click **"New Query"**
3. Paste the SQL from the file `supabase-schema.sql` (included in this project)
4. Click **Run** — this creates all your tables

---

## Step 2: Set Up GitHub (Your Code Repo)

1. Go to **https://github.com** and sign in (or create account)
2. Click the **+** icon → **New Repository**
3. Name it: `amenitra-command-center`
4. Set to **Private** (your strategy data is in here!)
5. Click **Create Repository**
6. Follow GitHub's instructions to push the code (or use GitHub Desktop app — easier)

### Using GitHub Desktop (Easiest Way):
1. Download **GitHub Desktop** from https://desktop.github.com
2. Sign in with your GitHub account
3. Click **File → Add Local Repository**
4. Select the project folder
5. Write a commit message like "Initial build"
6. Click **Publish Repository**

---

## Step 3: Set Up Netlify (Your Hosting)

1. Go to **https://netlify.com** and sign up with your GitHub account
2. Click **"Add New Site" → "Import an Existing Project"**
3. Choose **GitHub** → select `amenitra-command-center`
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Add Environment Variables"** and add:
   - `VITE_SUPABASE_URL` = your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **Deploy Site**

Your site will be live at something like: `https://amenitra-command-center.netlify.app`

You can customize the URL in **Site Settings → Domain Management**.

---

## Step 4: Seed Your Data

Once deployed, your app will be empty. You can either:
- **Option A**: Manually add accounts/tasks through the app interface
- **Option B**: Run the seed script to pre-populate with all your strategy data

To run the seed:
1. Go to Supabase → SQL Editor
2. Paste the contents of `supabase-seed.sql`
3. Click Run

---

## Ongoing Workflow

- **Edit code** → Push to GitHub → Netlify auto-deploys (takes ~30 seconds)
- **Data** lives in Supabase — persists across devices and sessions
- **Claude Cowork** can scan your browser tabs and feed data into the app

---

## File Structure
```
amenitra-command-center/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          ← Your command center (main app)
│   ├── main.jsx         ← Entry point
│   └── supabase.js      ← Supabase connection
├── package.json
├── vite.config.js
├── .env.example         ← Template for environment variables
├── .gitignore
├── netlify.toml         ← Netlify config
├── supabase-schema.sql  ← Database table definitions
├── supabase-seed.sql    ← Pre-populate with your data
└── DEPLOY.md            ← This file
```

---

## Need Help?
If anything goes wrong during deployment, paste the error message back to me in Claude and I'll walk you through the fix.
