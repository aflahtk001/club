-- ==============================================================================
-- APEX SPORTS CLUB - SUPABASE DATABASE SCHEMA & SEED DATA
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SPORTS TABLE
CREATE TABLE IF NOT EXISTS public.sports (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'team', 'racquet', 'individual'
  badge VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  specs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. FIXTURES & MATCHES TABLE
CREATE TABLE IF NOT EXISTS public.fixtures (
  id VARCHAR(100) PRIMARY KEY,
  sport VARCHAR(50) NOT NULL, -- 'football', 'cricket', 'basketball', 'badminton'
  league VARCHAR(255) NOT NULL,
  is_live BOOLEAN DEFAULT false,
  status_text VARCHAR(100) NOT NULL,
  home_team JSONB NOT NULL, -- { "name": "...", "rankOrDetail": "...", "score": "...", "iconType": "..." }
  away_team JSONB NOT NULL, -- { "name": "...", "rankOrDetail": "...", "score": "...", "iconType": "..." }
  venue VARCHAR(255) NOT NULL,
  footer_text VARCHAR(255) NOT NULL,
  highlight_scorers TEXT,
  action_text VARCHAR(100) DEFAULT 'View Details',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PRICING PLANS TABLE
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  tagline TEXT NOT NULL,
  monthly_price NUMERIC(10,2) NOT NULL,
  annual_price NUMERIC(10,2) NOT NULL,
  is_popular BOOLEAN DEFAULT false,
  features JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. COACHES TABLE
CREATE TABLE IF NOT EXISTS public.coaches (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(150) NOT NULL,
  credentials TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT NOT NULL,
  socials JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'tournaments', 'training', 'facilities'
  category_label VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. NEWS & EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.news (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  date VARCHAR(100) NOT NULL,
  excerpt TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. MERCHANDISE STORE TABLE
CREATE TABLE IF NOT EXISTS public.merchandise (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  badge VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. USER MEMBERSHIP REGISTRATION SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.membership_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  age_group VARCHAR(50) NOT NULL,
  sport VARCHAR(100) NOT NULL,
  plan VARCHAR(100) NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. CONTACT & TRIAL INQUIRY SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  sport VARCHAR(100) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fixtures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchandise ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow Public Read on Content Tables
CREATE POLICY "Public Read Sports" ON public.sports FOR SELECT USING (true);
CREATE POLICY "Public Read Fixtures" ON public.fixtures FOR SELECT USING (true);
CREATE POLICY "Public Read Pricing" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Public Read Coaches" ON public.coaches FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read News" ON public.news FOR SELECT USING (true);
CREATE POLICY "Public Read Merchandise" ON public.merchandise FOR SELECT USING (true);

-- Allow Public Insert for Registrations, Inquiries and Newsletter
CREATE POLICY "Public Insert Registrations" ON public.membership_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Registrations" ON public.membership_registrations FOR SELECT USING (true);

CREATE POLICY "Public Insert Inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Inquiries" ON public.contact_inquiries FOR SELECT USING (true);

CREATE POLICY "Public Insert Newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Newsletter" ON public.newsletter_subscribers FOR SELECT USING (true);

-- Allow Public Upsert/Update on Fixtures for the CMS Demo
CREATE POLICY "Public Update Fixtures" ON public.fixtures FOR ALL USING (true);
CREATE POLICY "Public Update News" ON public.news FOR ALL USING (true);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Sports
INSERT INTO public.sports (id, name, category, badge, image, description, specs) VALUES
('football', 'Football & Futsal Academy', 'team', 'Football', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80', 'Full 11-a-side natural turf pitch and two 5-a-side floodlit astro-turf cages. Youth academy & weekend corporate leagues.', '[{"icon": "clock", "text": "6 AM - 11 PM"}, {"icon": "users", "text": "5v5 & 11v11"}, {"icon": "award", "text": "UEFA Licensed"}]'::jsonb),
('cricket', 'Cricket Arena & Batting Nets', 'team', 'Cricket', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80', 'BCCI standard grass wicket, automated bowling machines, high-speed video analysis and 6 indoor & outdoor practice nets.', '[{"icon": "clock", "text": "6 AM - 10 PM"}, {"icon": "zap", "text": "6 Turf Nets"}, {"icon": "award", "text": "Bowling Machines"}]'::jsonb),
('basketball', 'Indoor Hardwood Basketball', 'team', 'Basketball', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80', 'FIBA-certified maple hardwood court with electronic shot clocks, spring-loaded glass backboards, and spectator seating.', '[{"icon": "clock", "text": "6 AM - 11 PM"}, {"icon": "shield", "text": "FIBA Hardwood"}, {"icon": "award", "text": "3x3 & 5v5"}]'::jsonb),
('badminton', 'Badminton Multi-Courts', 'racquet', 'Badminton', 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80', '8 international BWF-approved synthetic shock-absorption courts with glare-free specialized LED lighting and AC lounge.', '[{"icon": "clock", "text": "5:30 AM - 11 PM"}, {"icon": "layers", "text": "8 Courts"}, {"icon": "award", "text": "BWF Approved"}]'::jsonb),
('tennis', 'Championship Tennis Courts', 'racquet', 'Tennis', 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80', '4 synthetic acrylic hard courts and 2 clay courts. Professional racket stringing, ball machines and certified coaches.', '[{"icon": "clock", "text": "6 AM - 10 PM"}, {"icon": "sun", "text": "Hard & Clay"}, {"icon": "award", "text": "ITF Certified"}]'::jsonb),
('swimming', 'Olympic Aquatic Complex', 'individual', 'Swimming', 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80', '50m 8-lane temperature-controlled swimming pool with electronic touch pads, diving boards and dedicated kids pool.', '[{"icon": "clock", "text": "6 AM - 9 PM"}, {"icon": "thermometer", "text": "Heated Pool"}, {"icon": "award", "text": "FINA Standard"}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Seed Fixtures
INSERT INTO public.fixtures (id, sport, league, is_live, status_text, home_team, away_team, venue, footer_text, highlight_scorers, action_text) VALUES
('fix-1', 'football', 'Apex Premier League • Semifinal', true, 'LIVE 68''', '{"name": "Apex Thunder FC", "rankOrDetail": "Home", "score": "2", "iconType": "shield"}'::jsonb, '{"name": "Metro Strikers", "rankOrDetail": "Away", "score": "1", "iconType": "zap"}'::jsonb, 'Main Stadium', 'Started 07:00 PM', 'Apex: R. Silva 24'', M. Torres 58'' | MS: D. Vance 41''', 'Watch Stream'),
('fix-2', 'cricket', 'Apex T20 Championship • Super 8', true, 'LIVE 16.4 Ov', '{"name": "Apex Royals CC", "rankOrDetail": "168/4 (20.0 ov)", "score": "168/4", "iconType": "crown"}'::jsonb, '{"name": "Spartans CC", "rankOrDetail": "Target: 169 (Req. 27 from 20)", "score": "142/3", "iconType": "shield"}'::jsonb, 'Turf Ground A', 'Evening Match', 'K. Rahul 64*(38) • Bowler: A. Khan 2/28', 'Ball by Ball'),
('fix-3', 'basketball', 'Inter-Club Slam Cup • Final', false, 'Tomorrow, 06:30 PM', '{"name": "Apex Ballers", "rankOrDetail": "Seed #1", "score": "-", "iconType": "flame"}'::jsonb, '{"name": "Coastline Raptors", "rankOrDetail": "Seed #2", "score": "-", "iconType": "feather"}'::jsonb, 'Wooden Court 1', 'Free entry for club members', NULL, 'Book Seat'),
('fix-4', 'badminton', 'Masters Singles Open • Quarterfinal', false, 'Sat, Oct 11 • 10:00 AM', '{"name": "Vikram Sen", "rankOrDetail": "Rank #3", "score": "-", "iconType": "user"}'::jsonb, '{"name": "Lucas Meyer", "rankOrDetail": "Rank #6", "score": "-", "iconType": "user"}'::jsonb, 'Court 3 (AC)', 'Best of 3 sets (21 pts)', NULL, 'Register Fan Pass')
ON CONFLICT (id) DO NOTHING;

-- Seed News
INSERT INTO public.news (id, title, category, date, excerpt, image) VALUES
('news-1', 'Annual Junior Summer Sports Camp Registration Begins', 'Announcement', 'Oct 15, 2026', 'Open for ages 6–16 across Football, Cricket, Tennis and Swimming. Early bird discount of 25% valid until Oct 25.', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80'),
('news-2', 'Apex Corporate Football League 2026 Fixtures Revealed', 'Tournament', 'Oct 22, 2026', 'Over 32 corporate teams set to battle under the floodlights every weekend. Free entry passes available for all club members.', 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=600&q=80'),
('news-3', 'Upgraded BWF Certified Wooden Courts Inaugurated', 'Facility Upgrade', 'Nov 05, 2026', 'Enhanced anti-slip cushioning and high-lumen glare-free lights installed across all 8 badminton & squash courts.', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80')
ON CONFLICT (id) DO NOTHING;
