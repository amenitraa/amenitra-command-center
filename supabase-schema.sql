-- Amenitra's Marketing Command Center — Supabase Schema
-- Run this in Supabase SQL Editor to create all tables

-- Accounts table
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  initials TEXT,
  industry TEXT,
  industry_id TEXT,
  status TEXT DEFAULT 'active',
  health INTEGER DEFAULT 50,
  revenue TEXT,
  market_position TEXT,
  signals JSONB DEFAULT '[]',
  pain_hierarchy JSONB DEFAULT '[]',
  goals JSONB DEFAULT '[]',
  target_audience JSONB DEFAULT '[]',
  services JSONB DEFAULT '[]',
  tactics JSONB DEFAULT '[]',
  channels JSONB DEFAULT '[]',
  stakeholders JSONB DEFAULT '[]',
  notes TEXT DEFAULT '',
  strategy TEXT DEFAULT '',
  last_touch DATE,
  weekly_intel TEXT DEFAULT '',
  competitors TEXT DEFAULT '',
  consultant_prep TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  status TEXT DEFAULT 'Not Started',
  due DATE,
  priority TEXT DEFAULT 'medium',
  notes TEXT DEFAULT '',
  account TEXT DEFAULT '',
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Launches table
CREATE TABLE launches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'upcoming',
  account TEXT,
  channel TEXT,
  launch_date DATE,
  follow_ups JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goals table
CREATE TABLE goals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  target INTEGER DEFAULT 1,
  current INTEGER DEFAULT 0,
  type TEXT DEFAULT 'tasks',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content tracking table
CREATE TABLE content (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT,
  channel TEXT,
  industry TEXT,
  status TEXT DEFAULT 'needed',
  activated JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Strategy links table
CREATE TABLE strategy_links (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT,
  channel TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI conversation history
CREATE TABLE ai_history (
  id SERIAL PRIMARY KEY,
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE launches ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_history ENABLE ROW LEVEL SECURITY;

-- Create policies that allow all operations (since this is a personal app)
-- You can tighten these later if you add auth
CREATE POLICY "Allow all on accounts" ON accounts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on launches" ON launches FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on goals" ON goals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on content" ON content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on strategy_links" ON strategy_links FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on ai_history" ON ai_history FOR ALL USING (true) WITH CHECK (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER launches_updated_at BEFORE UPDATE ON launches FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER goals_updated_at BEFORE UPDATE ON goals FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER content_updated_at BEFORE UPDATE ON content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
