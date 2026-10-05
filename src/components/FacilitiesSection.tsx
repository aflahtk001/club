'use client';

import React from 'react';
import Image from 'next/image';
import { Dumbbell, HeartPulse, Utensils, Car, Medal } from 'lucide-react';

export default function FacilitiesSection() {
  const facilities = [
    {
      icon: Dumbbell,
      title: 'Strength & Conditioning Lab',
      desc: 'Olympic barbell platforms, custom turf sled tracks, and high-performance cardio stations.',
    },
    {
      icon: HeartPulse,
      title: 'Physiotherapy & Recovery',
      desc: 'Ice baths, hyperbaric oxygen chambers, sports massage therapy, and infrared recovery saunas.',
    },
    {
      icon: Utensils,
      title: 'Sports Nutritionist & Lounge',
      desc: 'High-protein fresh smoothie bar, tailored athlete dietary plans, and member lounge.',
    },
    {
      icon: Car,
      title: 'Secure Lockers & 300+ Parking',
      desc: 'Smart digital lockers, rainfall showers, steam suites, and EV charging stations.',
    },
  ];

  return (
    <section className="py-20 bg-white" id="facilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6">
            <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
              World-Class Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase tracking-tight mb-4">
              Built For Peak Athletic Performance
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Spread across 15 pristine acres, APEX Sports Club provides unmatched sports engineering, recovery centers, and modern clubhouse luxury.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facilities.map((fac, idx) => {
                const Icon = fac.icon;
                return (
                  <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex gap-3.5 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-secondary mb-1">{fac.title}</h4>
                      <p className="text-xs text-slate-500 leading-normal">{fac.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Visual */}
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"
                alt="Club Gym & Facility"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-secondary/95 text-white p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/10 shadow-lg">
                <Medal className="w-8 h-8 text-gold flex-shrink-0" />
                <div>
                  <strong className="block font-heading font-bold text-xs uppercase tracking-wider">Award Winning Club</strong>
                  <span className="text-[11px] text-slate-300">Best Sports Arena 2024 & 2025</span>
                </div>
              </div>
            </div>

            {/* Secondary Visuals */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-36 rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80"
                  alt="Training Zone"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white font-heading font-bold text-[11px] px-2 py-0.5 rounded">
                  Pro Training Zone
                </span>
              </div>
              <div className="relative h-36 rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=500&q=80"
                  alt="Recovery Spa"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white font-heading font-bold text-[11px] px-2 py-0.5 rounded">
                  Recovery & Sauna
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
