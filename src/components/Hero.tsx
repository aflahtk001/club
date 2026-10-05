'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Flame, UserPlus, CalendarDays, CheckCircle2, Users, Award, Activity, Trophy } from 'lucide-react';

interface HeroProps {
  onOpenJoinModal: (planOrSport?: string) => void;
}

export default function Hero({ onOpenJoinModal }: HeroProps) {
  const [counts, setCounts] = useState({ members: 0, trophies: 0, coaches: 0, tournaments: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1800;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;

          const targets = { members: 2400, trophies: 48, coaches: 32, tournaments: 15 };

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            setCounts({
              members: Math.round(targets.members * progress),
              trophies: Math.round(targets.trophies * progress),
              coaches: Math.round(targets.coaches * progress),
              tournaments: Math.round(targets.tournaments * progress),
            });

            if (step >= steps) {
              setCounts(targets);
              clearInterval(timer);
            }
          }, interval);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div className="relative bg-secondary overflow-hidden" id="home">
      {/* Background Image with High-Impact Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-primary/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 sm:pt-28 sm:pb-36 z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent-light text-xs sm:text-sm font-heading font-bold mb-6 backdrop-blur-md">
            <Flame className="w-4 h-4 text-accent" />
            Registration Open For Spring Season 2026
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white leading-tight uppercase tracking-tight mb-6">
            Unleash Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">Champion</span> Spirit
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8">
            Experience world-class sports facilities, professional academy coaching, elite tournament leagues, and an energetic athletic community across 8+ disciplines.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={() => onOpenJoinModal()}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-heading font-bold text-sm sm:text-base text-white bg-primary hover:bg-primary-hover shadow-blue transition-all hover:-translate-y-1"
            >
              <UserPlus className="w-5 h-5" />
              Become a Member
            </button>
            <a
              href="#fixtures"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-heading font-bold text-sm sm:text-base text-secondary bg-white hover:bg-slate-100 shadow-md transition-all hover:-translate-y-1"
            >
              <CalendarDays className="w-5 h-5 text-primary" />
              View Match Schedule
            </a>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 text-xs sm:text-sm font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" /> FIFA Grade Turf
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" /> BWF Approved Courts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" /> Floodlit Cricket Arena
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" /> Heated Olympic Pool
            </span>
          </div>
        </div>
      </div>

      {/* Floating Hero Stats Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 mb-12">
        <div
          ref={statsRef}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="flex items-center gap-4 lg:border-r border-slate-100 pr-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-secondary">{counts.members}</span>
                <span className="font-heading font-bold text-accent text-xl ml-0.5">+</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Members</p>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:border-r border-slate-100 pr-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-secondary">{counts.trophies}</span>
                <span className="font-heading font-bold text-accent text-xl ml-0.5">+</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Trophies Won</p>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:border-r border-slate-100 pr-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-secondary">{counts.coaches}</span>
                <span className="font-heading font-bold text-accent text-xl ml-0.5">+</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Certified Coaches</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-gold flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-secondary">{counts.tournaments}</span>
                <span className="font-heading font-bold text-accent text-xl ml-0.5">+</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Annual Tournaments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
