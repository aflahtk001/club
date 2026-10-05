'use client';

import React from 'react';
import Image from 'next/image';
import { coachesData } from '@/data/clubData';
import { Linkedin, Instagram } from 'lucide-react';

export default function CoachesSection() {
  return (
    <section className="py-20 bg-white" id="coaches">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            World-Class Mentors
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase tracking-tight mb-4">
            Meet Our Pro Coaching Staff
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Learn techniques, mental conditioning, and strategic gameplay from national champions and internationally certified head coaches.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coachesData.map((coach) => (
            <div
              key={coach.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              {/* Photo */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={coach.socials.linkedin}
                    className="w-8 h-8 rounded-full bg-white/90 text-secondary hover:bg-primary hover:text-white flex items-center justify-center shadow-md transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={coach.socials.instagram}
                    className="w-8 h-8 rounded-full bg-white/90 text-secondary hover:bg-accent hover:text-white flex items-center justify-center shadow-md transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-grow">
                <span className="font-heading font-bold text-[11px] uppercase tracking-wider text-accent mb-1">
                  {coach.role}
                </span>
                <h3 className="font-heading font-bold text-lg text-secondary mb-1">
                  {coach.name}
                </h3>
                <p className="text-xs font-semibold text-primary mb-3">
                  {coach.credentials}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed mt-auto">
                  {coach.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
