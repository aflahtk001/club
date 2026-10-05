'use client';

import React, { useState } from 'react';
import { pricingData } from '@/data/clubData';
import { Check, X, Star } from 'lucide-react';

interface MembershipSectionProps {
  onOpenJoinModal: (planName?: string) => void;
}

export default function MembershipSection({ onOpenJoinModal }: MembershipSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-20 bg-slate-50" id="membership">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Join Our Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase tracking-tight mb-4">
            Flexible Membership Plans
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-8">
            Choose a plan that fits your athletic goals. All memberships include full access to locker rooms, fitness centers, and club tournaments.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-3 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
            <span className={`text-xs sm:text-sm font-heading font-bold px-3 py-1 cursor-pointer transition-colors ${!isAnnual ? 'text-secondary' : 'text-slate-400'}`} onClick={() => setIsAnnual(false)}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${isAnnual ? 'bg-primary justify-end' : 'bg-slate-300 justify-start'}`}
            >
              <span className="bg-white w-4 h-4 rounded-full shadow-md" />
            </button>
            <span className={`text-xs sm:text-sm font-heading font-bold px-3 py-1 cursor-pointer transition-colors flex items-center gap-1.5 ${isAnnual ? 'text-secondary' : 'text-slate-400'}`} onClick={() => setIsAnnual(true)}>
              Annual <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {pricingData.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                  plan.isPopular
                    ? 'border-2 border-primary shadow-xl md:-translate-y-2'
                    : 'border border-slate-200 shadow-sm hover:shadow-lg'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white font-heading font-extrabold text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Most Popular
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center pb-6 border-b border-slate-100 mb-6">
                  <h3 className="font-heading font-extrabold text-xl text-secondary mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-500 min-h-[32px]">{plan.tagline}</p>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="font-heading font-bold text-2xl text-secondary">$</span>
                    <span className="font-heading font-black text-5xl text-secondary">{price}</span>
                    <span className="text-xs text-slate-500 ml-1.5">
                      {isAnnual ? '/ mo (annual)' : '/ month'}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 mb-8 flex-grow">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                      {feat.included ? (
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feat.included ? 'text-slate-700' : 'text-slate-400 line-through'}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => onOpenJoinModal(plan.name)}
                    className={`w-full py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all ${
                      plan.isPopular
                        ? 'bg-primary hover:bg-primary-hover text-white shadow-blue hover:-translate-y-0.5'
                        : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
