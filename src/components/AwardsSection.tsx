'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AwardItem, awardsData } from '@/data/clubData';
import { ClubService } from '@/services/clubService';
import { supabase } from '@/lib/supabase';
import { Trophy, Medal, Calendar } from 'lucide-react';

export default function AwardsSection() {
  const [awards, setAwards] = useState<AwardItem[]>(awardsData);
  const [selectedSport, setSelectedSport] = useState<string>('All');

  const loadAwards = async () => {
    const data = await ClubService.getAwards();
    if (data && data.length > 0) {
      setAwards(data);
    }
  };

  useEffect(() => {
    loadAwards();

    const client = supabase;
    if (client) {
      const channel = client
        .channel('realtime_awards')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'awards' },
          () => {
            loadAwards();
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    }
  }, []);

  const sportsList = ['All', ...Array.from(new Set(awards.map((a) => a.sport)))];

  const filteredAwards = awards.filter((a) => {
    if (selectedSport === 'All') return true;
    return a.sport === selectedSport;
  });

  return (
    <section className="py-20 bg-white" id="awards">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Hall Of Fame & Trophies
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase tracking-tight mb-4">
            Our Championship Legacy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Celebrating decades of athletic dominance, championship victories, and honors across all divisions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {sportsList.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-heading font-bold transition-all ${
                selectedSport === sport
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAwards.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
            >
              {item.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 right-3 bg-amber-500 text-white font-heading font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                    <Medal className="w-3 h-3" /> {item.badge || 'Champion'}
                  </span>
                  <span className="absolute bottom-3 left-3 text-white font-heading font-black text-sm flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> {item.year}
                  </span>
                </div>
              )}

              <div className="p-5 flex flex-col flex-grow">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                  {item.sport} • {item.category}
                </span>
                <h3 className="font-heading font-bold text-base text-secondary mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
                  {item.description}
                </p>
                <div className="pt-3 border-t border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Trophy className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Apex Honor Roll</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
