'use client';

import React, { useState, useEffect } from 'react';
import { fixturesData, FixtureItem } from '@/data/clubData';
import { ClubService } from '@/services/clubService';
import { supabase } from '@/lib/supabase';
import { Globe, Shield, Zap, Flame, Feather, User, Crown, Calendar, Clock } from 'lucide-react';

interface FixturesSectionProps {
  onOpenJoinModal: (planOrSport?: string) => void;
}

export default function FixturesSection({ onOpenJoinModal }: FixturesSectionProps) {
  const [sportFilter, setSportFilter] = useState<'all' | 'football' | 'cricket' | 'basketball' | 'badminton'>('all');
  const [fixtures, setFixtures] = useState<FixtureItem[]>(fixturesData);

  const loadFixtures = async () => {
    const data = await ClubService.getFixtures();
    if (data && data.length > 0) {
      setFixtures(data);
    }
  };

  useEffect(() => {
    loadFixtures();

    const client = supabase;
    if (client) {
      const channel = client
        .channel('realtime_fixtures')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'fixtures' },
          () => {
            loadFixtures();
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    }
  }, []);

  const filteredFixtures = fixtures.filter((fixture) => {
    if (sportFilter === 'all') return true;
    return fixture.sport === sportFilter;
  });

  const getTeamIcon = (iconType: string, isAlt = false) => {
    const colorClass = isAlt ? 'text-accent' : 'text-primary';
    switch (iconType) {
      case 'shield': return <Shield className={`w-5 h-5 ${colorClass}`} />;
      case 'zap': return <Zap className={`w-5 h-5 ${colorClass}`} />;
      case 'crown': return <Crown className={`w-5 h-5 ${colorClass}`} />;
      case 'flame': return <Flame className={`w-5 h-5 ${colorClass}`} />;
      case 'feather': return <Feather className={`w-5 h-5 ${colorClass}`} />;
      case 'user': return <User className={`w-5 h-5 ${colorClass}`} />;
      default: return <Shield className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  return (
    <section className="py-20 bg-slate-50" id="fixtures">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Leagues & Tournaments
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase tracking-tight mb-4">
            Match Fixtures & Live Scoreboard
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Track real-time scores, upcoming derby matches, and championship tournament schedules across all club divisions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {[
            { label: 'All Matches', value: 'all', icon: Globe },
            { label: 'Football', value: 'football', icon: Shield },
            { label: 'Cricket', value: 'cricket', icon: Zap },
            { label: 'Basketball', value: 'basketball', icon: Flame },
            { label: 'Badminton', value: 'badminton', icon: Feather },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => setSportFilter(tab.value as any)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-bold transition-all ${
                  sportFilter === tab.value
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Fixtures List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredFixtures.map((fixture) => (
            <div
              key={fixture.id}
              className={`bg-white rounded-2xl border p-6 transition-all duration-300 hover:shadow-md ${
                fixture.isLive
                  ? 'border-l-4 border-l-emerald-500 border-slate-200 bg-gradient-to-r from-emerald-50/40 via-white to-white'
                  : 'border-slate-200'
              }`}
            >
              {/* Top League Meta */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-dashed border-slate-200 mb-6">
                <span className="font-heading font-bold text-xs uppercase text-slate-500">
                  {fixture.league}
                </span>
                {fixture.isLive ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span className="pulse-dot"></span> {fixture.statusText}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-slate-100 text-slate-700">
                    <Calendar className="w-3.5 h-3.5" /> {fixture.statusText}
                  </span>
                )}
              </div>

              {/* Match Score Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-6">
                {/* Home Team */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {getTeamIcon(fixture.homeTeam.iconType)}
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-secondary">
                      {fixture.homeTeam.name}
                    </h4>
                    <span className="text-xs text-slate-500">{fixture.homeTeam.rankOrDetail}</span>
                  </div>
                  <span className="font-heading font-black text-2xl sm:text-3xl text-secondary ml-auto">
                    {fixture.homeTeam.score}
                  </span>
                </div>

                {/* VS Center */}
                <div className="flex flex-col items-center justify-center py-2">
                  <span className="font-heading font-black text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded">
                    VS
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1">{fixture.venue}</span>
                </div>

                {/* Away Team */}
                <div className="flex items-center md:flex-row-reverse gap-4 text-left md:text-right">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    {getTeamIcon(fixture.awayTeam.iconType, true)}
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-secondary">
                      {fixture.awayTeam.name}
                    </h4>
                    <span className="text-xs text-slate-500">{fixture.awayTeam.rankOrDetail}</span>
                  </div>
                  <span className="font-heading font-black text-2xl sm:text-3xl text-secondary ml-auto md:ml-0 md:mr-auto">
                    {fixture.awayTeam.score}
                  </span>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {fixture.footerText}</span>
                  {fixture.highlightScorers && (
                    <span className="font-medium text-slate-700 hidden sm:inline">
                      <Flame className="w-3.5 h-3.5 inline text-accent mr-1" />
                      {fixture.highlightScorers}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onOpenJoinModal()}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold text-white bg-primary hover:bg-primary-hover transition-colors"
                >
                  {fixture.actionText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
