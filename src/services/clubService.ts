import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  sportsData,
  fixturesData,
  pricingData,
  coachesData,
  galleryData,
  newsData,
  merchData,
  awardsData,
  SportItem,
  FixtureItem,
  PricingPlan,
  CoachItem,
  GalleryItem,
  NewsItem,
  MerchItem,
  AwardItem,
} from '@/data/clubData';

export const ClubService = {
  // Fetch Sports
  async getSports(): Promise<SportItem[]> {
    if (!isSupabaseConfigured || !supabase) return sportsData;
    try {
      const { data, error } = await supabase.from('sports').select('*');
      if (error || !data || data.length === 0) return sportsData;
      return data.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        badge: item.badge,
        image: item.image,
        description: item.description,
        specs: item.specs || [],
      }));
    } catch {
      return sportsData;
    }
  },

  // Fetch Awards & Trophies
  async getAwards(): Promise<AwardItem[]> {
    if (!isSupabaseConfigured || !supabase) return awardsData;
    try {
      const { data, error } = await supabase.from('awards').select('*').order('year', { ascending: false });
      if (error || !data || data.length === 0) return awardsData;
      return data.map((item) => ({
        id: item.id,
        title: item.title,
        sport: item.sport,
        year: item.year,
        category: item.category,
        description: item.description,
        image: item.image,
        badge: item.badge,
      }));
    } catch {
      return awardsData;
    }
  },

  // Add Award (CMS)
  async createAward(awardItem: Omit<AwardItem, 'id'>) {
    const id = `award-${Date.now()}`;
    if (!isSupabaseConfigured || !supabase) return { success: true, item: { id, ...awardItem }, localOnly: true };
    try {
      const { error } = await supabase.from('awards').insert([{ id, ...awardItem }]);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Fetch Fixtures & Live Matches
  async getFixtures(): Promise<FixtureItem[]> {
    if (!isSupabaseConfigured || !supabase) return fixturesData;
    try {
      const { data, error } = await supabase.from('fixtures').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) return fixturesData;
      return data.map((item) => ({
        id: item.id,
        sport: item.sport,
        league: item.league,
        isLive: item.is_live,
        statusText: item.status_text,
        homeTeam: item.home_team,
        awayTeam: item.away_team,
        venue: item.venue,
        footerText: item.footer_text,
        highlightScorers: item.highlight_scorers,
        actionText: item.action_text || 'View Details',
      }));
    } catch {
      return fixturesData;
    }
  },

  // Update Fixture Score / Status (for Live CMS updates)
  async updateFixture(
    id: string,
    updates: Partial<{
      is_live: boolean;
      status_text: string;
      home_score: string;
      away_score: string;
      highlight_scorers: string;
    }>
  ) {
    if (!isSupabaseConfigured || !supabase) return { success: true, localOnly: true };
    try {
      const { data: fixture } = await supabase.from('fixtures').select('*').eq('id', id).single();
      if (!fixture) return { success: false, error: 'Fixture not found' };

      const updatedHome = { ...fixture.home_team, score: updates.home_score ?? fixture.home_team.score };
      const updatedAway = { ...fixture.away_team, score: updates.away_score ?? fixture.away_team.score };

      const { error } = await supabase
        .from('fixtures')
        .update({
          is_live: updates.is_live ?? fixture.is_live,
          status_text: updates.status_text ?? fixture.status_text,
          home_team: updatedHome,
          away_team: updatedAway,
          highlight_scorers: updates.highlight_scorers ?? fixture.highlight_scorers,
        })
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Fetch News & Announcements
  async getNews(): Promise<NewsItem[]> {
    if (!isSupabaseConfigured || !supabase) return newsData;
    try {
      const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) return newsData;
      return data;
    } catch {
      return newsData;
    }
  },

  // Add News Article (CMS)
  async createNews(newsItem: Omit<NewsItem, 'id'>) {
    const id = `news-${Date.now()}`;
    if (!isSupabaseConfigured || !supabase) return { success: true, item: { id, ...newsItem }, localOnly: true };
    try {
      const { error } = await supabase.from('news').insert([{ id, ...newsItem }]);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Submit Membership Registration
  async submitRegistration(registration: {
    fullName: string;
    email: string;
    phone: string;
    ageGroup: string;
    sport: string;
    plan: string;
    notes?: string;
  }) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true, localOnly: true };
    }
    try {
      const { error } = await supabase.from('membership_registrations').insert([
        {
          full_name: registration.fullName,
          email: registration.email,
          phone: registration.phone,
          age_group: registration.ageGroup,
          sport: registration.sport,
          plan: registration.plan,
          notes: registration.notes,
        },
      ]);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Submit Contact Inquiry / Trial Booking
  async submitInquiry(inquiry: {
    fullName: string;
    phone: string;
    email: string;
    sport: string;
    message?: string;
  }) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true, localOnly: true };
    }
    try {
      const { error } = await supabase.from('contact_inquiries').insert([
        {
          full_name: inquiry.fullName,
          phone: inquiry.phone,
          email: inquiry.email,
          sport: inquiry.sport,
          message: inquiry.message,
        },
      ]);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Submit Newsletter Subscription
  async subscribeNewsletter(email: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true, localOnly: true };
    }
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert([{ email }]);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Fetch Member Registrations for Admin
  async getRegistrations() {
    if (!isSupabaseConfigured || !supabase) return [];
    try {
      const { data, error } = await supabase
        .from('membership_registrations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) return [];
      return data;
    } catch {
      return [];
    }
  },

  // Fetch Inquiries for Admin
  async getInquiries() {
    if (!isSupabaseConfigured || !supabase) return [];
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) return [];
      return data;
    } catch {
      return [];
    }
  },
};
