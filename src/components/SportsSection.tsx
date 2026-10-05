'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { sportsData, SportItem } from '@/data/clubData';
import { Clock, Users, Zap, Shield, Layers, Sun, Thermometer, Award, ArrowRight } from 'lucide-react';

interface SportsSectionProps {
  onOpenJoinModal: (planOrSport?: string) => void;
}

export default function SportsSection({ onOpenJoinModal }: SportsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'team' | 'racquet' | 'individual'>('all');

  const filteredSports = sportsData.filter((sport) => {
    if (filter === 'all') return true;
    return sport.category === filter;
  });

  const getSpecIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock': return <Clock className="w-3.5 h-3.5 text-primary" />;
      case 'users': return <Users className="w-3.5 h-3.5 text-primary" />;
      case 'zap': return <Zap className="w-3.5 h-3.5 text-primary" />;
      case 'shield': return <Shield className="w-3.5 h-3.5 text-primary" />;
      case 'layers': return <Layers className="w-3.5 h-3.5 text-primary" />;
      case 'sun': return <Sun className="w-3.5 h-3.5 text-primary" />;
      case 'thermometer': return <Thermometer className="w-3.5 h-3.5 text-primary" />;
      case 'award': return <Award className="w-3.5 h-3.5 text-primary" />;
      default: return <Award className="w-3.5 h-3.5 text-primary" />;
    }
  };

  return (
    <section className="py-20 bg-white" id="sports">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Our Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase tracking-tight mb-4">
            Explore Sports Arenas & Academies
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Whether you play competitively in league championships or train for fitness and leisure, APEX has dedicated facilities and tailored training sessions for all age groups.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {[
            { label: 'All Sports', value: 'all' },
            { label: 'Team Sports', value: 'team' },
            { label: 'Racquet Sports', value: 'racquet' },
            { label: 'Fitness & Aquatic', value: 'individual' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold transition-all ${
                filter === tab.value
                  ? 'bg-primary text-white shadow-blue'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sports Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSports.map((sport) => (
            <div
              key={sport.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={sport.image}
                  alt={sport.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 bg-secondary/90 text-white font-heading font-bold text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  {sport.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-lg text-secondary mb-2 group-hover:text-primary transition-colors">
                  {sport.name}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 flex-grow">
                  {sport.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 mb-6 text-xs font-semibold text-slate-700">
                  {sport.specs.map((spec, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
                      {getSpecIcon(spec.icon)}
                      {spec.text}
                    </span>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <button
                    onClick={() => onOpenJoinModal(sport.badge)}
                    className="px-4 py-2 text-xs font-heading font-bold text-primary border border-primary/30 hover:bg-primary hover:text-white rounded-lg transition-colors"
                  >
                    Join Academy
                  </button>
                  <a
                    href="#fixtures"
                    className="inline-flex items-center gap-1 text-xs font-heading font-bold text-slate-600 hover:text-primary transition-colors"
                  >
                    Fixtures <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
