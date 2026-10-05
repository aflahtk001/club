'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ClubService } from '@/services/clubService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { FixtureItem, NewsItem, AwardItem } from '@/data/clubData';
import {
  Trophy,
  Activity,
  PlusCircle,
  Users,
  MessageSquare,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowLeft,
  Flame,
  Radio,
  Clock,
  Medal,
  Lock,
  Mail,
  ShieldCheck,
  LogOut,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AdminPage() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();

  // Admin login form states
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard states
  const [activeTab, setActiveTab] = useState<'fixtures' | 'awards' | 'news' | 'registrations' | 'inquiries'>('fixtures');
  const [fixtures, setFixtures] = useState<FixtureItem[]>([]);
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // New Award Form State
  const [newAward, setNewAward] = useState({
    title: '',
    sport: 'Football',
    year: new Date().getFullYear(),
    category: 'Championship',
    description: '',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    badge: 'Gold Medal',
  });

  // New Article Form state
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Announcement',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    excerpt: '',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80',
  });

  const loadData = async () => {
    setDataLoading(true);
    try {
      const [fixData, awardsDataRes, newsData, regData, inqData] = await Promise.all([
        ClubService.getFixtures(),
        ClubService.getAwards(),
        ClubService.getNews(),
        ClubService.getRegistrations(),
        ClubService.getInquiries(),
      ]);
      setFixtures(fixData);
      setAwards(awardsDataRes);
      setNews(newsData);
      setRegistrations(regData);
      setInquiries(inqData);
    } catch (err) {
      console.error(err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    const res = await signIn(adminEmail, adminPassword);
    setLoginLoading(false);

    if (res.error) {
      setLoginError(res.error);
    }
  };

  const handleScoreUpdate = async (
    fixtureId: string,
    homeScore: string,
    awayScore: string,
    statusText: string,
    isLive: boolean,
    highlightScorers: string
  ) => {
    const res = await ClubService.updateFixture(fixtureId, {
      home_score: homeScore,
      away_score: awayScore,
      status_text: statusText,
      is_live: isLive,
      highlight_scorers: highlightScorers,
    });

    if (res.success) {
      setStatusMsg({ text: 'Score updated successfully! Front-end refreshed.', type: 'success' });
      setFixtures((prev) =>
        prev.map((f) =>
          f.id === fixtureId
            ? {
                ...f,
                homeTeam: { ...f.homeTeam, score: homeScore },
                awayTeam: { ...f.awayTeam, score: awayScore },
                statusText,
                isLive,
                highlightScorers,
              }
            : f
        )
      );
    } else {
      setStatusMsg({ text: `Failed: ${res.error || 'Unknown error'}`, type: 'error' });
    }

    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handlePublishAward = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await ClubService.createAward(newAward);
    if (res.success) {
      setStatusMsg({ text: 'Award / Trophy added to Hall of Fame!', type: 'success' });
      setAwards((prev) => [{ id: `award-${Date.now()}`, ...newAward }, ...prev]);
      setNewAward({
        title: '',
        sport: 'Football',
        year: new Date().getFullYear(),
        category: 'Championship',
        description: '',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
        badge: 'Gold Medal',
      });
    } else {
      setStatusMsg({ text: `Failed: ${res.error}`, type: 'error' });
    }
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handlePublishNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await ClubService.createNews(newArticle);
    if (res.success) {
      setStatusMsg({ text: 'News article published to website!', type: 'success' });
      setNews((prev) => [{ id: `news-${Date.now()}`, ...newArticle }, ...prev]);
      setNewArticle({
        title: '',
        category: 'Announcement',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        excerpt: '',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80',
      });
    } else {
      setStatusMsg({ text: `Failed: ${res.error}`, type: 'error' });
    }
    setTimeout(() => setStatusMsg(null), 3500);
  };

  // --------------------------------------------------------------------------
  // 1. Loading Screen
  // --------------------------------------------------------------------------
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. Admin Authentication Gate (If not signed in)
  // --------------------------------------------------------------------------
  if (!user) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full mx-auto mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto bg-slate-950 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 text-white">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4 border border-blue-400/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
              Admin & CMS Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Authorized club staff sign-in for scoreboards, announcements & roster control
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3.5 bg-rose-950/80 border border-rose-700 text-rose-200 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-bold text-slate-300 uppercase mb-1.5">
                Staff Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@apexsportsclub.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:border-primary focus:bg-slate-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-slate-300 uppercase mb-1.5">
                Manager Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:border-primary focus:bg-slate-900 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-sm rounded-xl shadow-blue transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-60 mt-2"
            >
              {loginLoading ? (
                'Authenticating...'
              ) : (
                <>Sign In to CMS <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-900 text-center">
            <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Protected by Supabase Row Level Security
            </span>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 3. Authenticated Admin CMS Dashboard
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-body">
      {/* Top Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Trophy className="w-4 h-4" />
              </div>
              <h1 className="font-heading font-black text-lg text-white">APEX Club Manager</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Supabase Status Pill */}
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                isSupabaseConfigured
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              {isSupabaseConfigured ? 'Supabase Connected' : 'Local Fallback Mode'}
            </div>

            {/* Current Admin User & Sign Out */}
            <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
              <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                {user.email ? user.email.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className="text-slate-300 max-w-[120px] truncate hidden sm:inline">{user.email}</span>
              <button
                onClick={() => signOut()}
                className="text-slate-400 hover:text-rose-400 ml-1 transition-colors"
                title="Sign Out Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={loadData}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {/* Toast status */}
        {statusMsg && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-200'
                : 'bg-rose-950/80 border border-rose-700 text-rose-200'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{statusMsg.text}</span>
          </div>
        )}

        {/* Database setup notice if not configured */}
        {!isSupabaseConfigured && (
          <div className="mb-8 p-5 bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-800/60 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-sm text-blue-200 mb-1 flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" /> Connect your Supabase Project in 2 Minutes
              </h3>
              <p className="text-xs text-slate-400 max-w-2xl">
                Add your <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code> and run the generated <code>supabase/schema.sql</code> in your Supabase SQL Editor.
              </p>
            </div>
            <span className="text-xs font-semibold bg-blue-900/50 text-blue-300 px-3 py-1.5 rounded-lg border border-blue-700 whitespace-nowrap">
              Schema Ready in /supabase/schema.sql
            </span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'fixtures', label: 'Live Match Scores', icon: Activity },
            { id: 'awards', label: `Awards & Trophies (${awards.length})`, icon: Medal },
            { id: 'news', label: 'Publish News & Events', icon: PlusCircle },
            { id: 'registrations', label: `Member Applications (${registrations.length})`, icon: Users },
            { id: 'inquiries', label: `Inquiries & Trials (${inquiries.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-blue'
                    : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Live Scores & Fixtures Editor */}
        {activeTab === 'fixtures' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-white mb-1">
                Live Scoreboard & Fixture Control
              </h2>
              <p className="text-xs text-slate-400">
                Update live scores, change match status to LIVE / Finished, or modify goal scorers. Updates reflect directly on the public website.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {fixtures.map((fix) => (
                <FixtureEditorCard
                  key={fix.id}
                  fixture={fix}
                  onSave={handleScoreUpdate}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Awards & Trophies */}
        {activeTab === 'awards' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Award Form */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
                <Medal className="w-5 h-5 text-gold" /> Add Trophy / Award
              </h3>
              <form onSubmit={handlePublishAward} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Award Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. State Premier League Champions"
                    value={newAward.title}
                    onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Sport</label>
                    <select
                      value={newAward.sport}
                      onChange={(e) => setNewAward({ ...newAward, sport: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                    >
                      <option value="Football">Football</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Badminton">Badminton</option>
                      <option value="Tennis">Tennis</option>
                      <option value="Swimming">Swimming</option>
                      <option value="General">General / Club</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Year</label>
                    <input
                      type="number"
                      value={newAward.year}
                      onChange={(e) => setNewAward({ ...newAward, year: parseInt(e.target.value) || new Date().getFullYear() })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Category</label>
                    <select
                      value={newAward.category}
                      onChange={(e) => setNewAward({ ...newAward, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                    >
                      <option value="Championship">Championship</option>
                      <option value="Runner-Up">Runner-Up</option>
                      <option value="Individual Gold">Individual Gold</option>
                      <option value="Excellence Award">Excellence Award</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Badge Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. State Champions"
                      value={newAward.badge}
                      onChange={(e) => setNewAward({ ...newAward, badge: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Trophy / Celebration Image URL</label>
                  <input
                    type="url"
                    value={newAward.image}
                    onChange={(e) => setNewAward({ ...newAward, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Award Story / Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Brief description of the match victory or milestone..."
                    value={newAward.description}
                    onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gold hover:bg-amber-600 text-slate-950 font-heading font-bold rounded-xl transition-all shadow-md"
                >
                  Save Award to Hall of Fame
                </button>
              </form>
            </div>

            {/* Existing Awards List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Hall of Fame Trophies ({awards.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {awards.map((item) => (
                  <div key={item.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gold uppercase bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                        {item.badge || item.category}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">{item.year}</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-white">{item.title}</h4>
                    <p className="text-[11px] text-primary font-semibold">{item.sport} • {item.category}</p>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Publish News */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Form */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-primary" /> Post New Announcement
              </h3>
              <form onSubmit={handlePublishNews} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Tennis Championship Registration"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Category</label>
                    <select
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                    >
                      <option value="Announcement">Announcement</option>
                      <option value="Tournament">Tournament</option>
                      <option value="Facility Upgrade">Facility Upgrade</option>
                      <option value="Community">Community</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Date</label>
                    <input
                      type="text"
                      value={newArticle.date}
                      onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newArticle.image}
                    onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Article Summary / Excerpt *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about the event, timings, or discount codes..."
                    value={newArticle.excerpt}
                    onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-primary outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-heading font-bold rounded-xl transition-all shadow-blue"
                >
                  Publish Article to Front-End
                </button>
              </form>
            </div>

            {/* Existing News List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Published News ({news.length})
              </h3>
              {news.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-primary uppercase bg-primary/10 px-2.5 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Member Applications */}
        {activeTab === 'registrations' && (
          <div className="space-y-4">
            <h2 className="font-heading font-extrabold text-xl text-white mb-2">
              Incoming Membership Applications ({registrations.length})
            </h2>
            {registrations.length === 0 ? (
              <div className="bg-slate-950 border border-slate-800 p-12 text-center rounded-2xl">
                <Users className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-300">No member submissions recorded yet</h4>
                <p className="text-xs text-slate-500 mt-1">Submissions made via the &ldquo;Join Club&rdquo; modal will be stored here in real time.</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-slate-950 border border-slate-800 rounded-2xl shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-heading font-bold uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Sport</th>
                      <th className="p-4">Plan</th>
                      <th className="p-4">Age Group</th>
                      <th className="p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {registrations.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-900/50">
                        <td className="p-4 font-semibold text-white">{r.full_name}</td>
                        <td className="p-4 text-slate-400">{r.email}<br />{r.phone}</td>
                        <td className="p-4"><span className="bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded">{r.sport}</span></td>
                        <td className="p-4 font-bold text-emerald-400">{r.plan}</td>
                        <td className="p-4 text-slate-400">{r.age_group}</td>
                        <td className="p-4 text-slate-500">{new Date(r.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Contact Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <h2 className="font-heading font-extrabold text-xl text-white mb-2">
              Contact & Trial Inquiries ({inquiries.length})
            </h2>
            {inquiries.length === 0 ? (
              <div className="bg-slate-950 border border-slate-800 p-12 text-center rounded-2xl">
                <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-300">No inquiry messages yet</h4>
                <p className="text-xs text-slate-500 mt-1">Messages submitted from the Contact section form appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inquiries.map((inq, i) => (
                  <div key={i} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{inq.full_name}</span>
                      <span className="text-primary bg-primary/10 px-2 py-0.5 rounded font-bold">{inq.sport}</span>
                    </div>
                    <p className="text-slate-400">{inq.email} • {inq.phone}</p>
                    <p className="text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 italic">
                      &ldquo;{inq.message || 'No extra notes provided'}&rdquo;
                    </p>
                    <span className="text-[10px] text-slate-500 block">
                      Received {new Date(inq.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function FixtureEditorCard({
  fixture,
  onSave,
}: {
  fixture: FixtureItem;
  onSave: (
    id: string,
    homeScore: string,
    awayScore: string,
    statusText: string,
    isLive: boolean,
    highlightScorers: string
  ) => void;
}) {
  const [homeScore, setHomeScore] = useState(fixture.homeTeam.score);
  const [awayScore, setAwayScore] = useState(fixture.awayTeam.score);
  const [statusText, setStatusText] = useState(fixture.statusText);
  const [isLive, setIsLive] = useState(fixture.isLive);
  const [highlightScorers, setHighlightScorers] = useState(fixture.highlightScorers || '');

  return (
    <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800 mb-5">
        <span className="font-heading font-bold text-xs uppercase text-slate-400">
          {fixture.league} • <span className="text-primary capitalize">{fixture.sport}</span>
        </span>
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
          <input
            type="checkbox"
            checked={isLive}
            onChange={(e) => setIsLive(e.target.checked)}
            className="rounded text-primary focus:ring-0 cursor-pointer"
          />
          <Radio className={`w-3.5 h-3.5 ${isLive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
          Set Match LIVE
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-5">
        {/* Home */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-300">{fixture.homeTeam.name} (Home)</label>
          <input
            type="text"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-heading font-extrabold text-xl focus:border-primary outline-none"
            placeholder="0"
          />
        </div>

        {/* Status / Timing */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary" /> Status / Minute / Overs
          </label>
          <input
            type="text"
            value={statusText}
            onChange={(e) => setStatusText(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-semibold focus:border-primary outline-none"
            placeholder="e.g. LIVE 75' or Tomorrow, 6:00 PM"
          />
        </div>

        {/* Away */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-300">{fixture.awayTeam.name} (Away)</label>
          <input
            type="text"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-heading font-extrabold text-xl focus:border-primary outline-none"
            placeholder="0"
          />
        </div>
      </div>

      {/* Scorers / Commentary Highlight */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-accent" /> Scorers / Key Batsman Highlight
        </label>
        <input
          type="text"
          value={highlightScorers}
          onChange={(e) => setHighlightScorers(e.target.value)}
          className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-primary outline-none"
          placeholder="e.g. R. Silva 24', M. Torres 58' | MS: D. Vance 41'"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onSave(fixture.id, homeScore, awayScore, statusText, isLive, highlightScorers)}
          className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs rounded-xl shadow-blue transition-all"
        >
          Save & Update Live Score
        </button>
      </div>
    </div>
  );
}
