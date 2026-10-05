'use client';

import React from 'react';
import Image from 'next/image';
import { merchData } from '@/data/clubData';
import { ShoppingBag } from 'lucide-react';

interface MerchandiseSectionProps {
  onOpenJoinModal: (itemName?: string) => void;
}

export default function MerchandiseSection({ onOpenJoinModal }: MerchandiseSectionProps) {
  return (
    <section className="py-20 bg-slate-50" id="merch">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            APEX Gear & Apparel
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase tracking-tight mb-4">
            Official Club Store
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Wear your club colors with pride. High performance breathable dry-fit match jerseys, training gear, and equipment.
          </p>
        </div>

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {merchData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.badge && (
                  <span className="absolute top-3 right-3 bg-accent text-white font-heading font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h4 className="font-heading font-bold text-sm text-secondary mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-normal mb-4 flex-grow">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="font-heading font-extrabold text-lg text-secondary">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onOpenJoinModal(item.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-bold text-white bg-primary hover:bg-primary-hover shadow-sm transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Order Gear
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
