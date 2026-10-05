'use client';

import React from 'react';
import { testimonialsData } from '@/data/clubData';
import { Star, CheckCircle } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Athlete Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase tracking-tight mb-4">
            What Our Members Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testi) => (
            <div
              key={testi.id}
              className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-gold mb-5">
                  {Array.from({ length: testi.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-8">
                  &ldquo;{testi.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-secondary leading-tight">
                    {testi.name}
                  </h4>
                  <span className="text-[11px] text-slate-500">{testi.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
