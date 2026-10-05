'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { galleryData, GalleryItem } from '@/data/clubData';
import { ZoomIn } from 'lucide-react';

interface GallerySectionProps {
  onOpenLightbox: (item: GalleryItem, index: number, list: GalleryItem[]) => void;
}

export default function GallerySection({ onOpenLightbox }: GallerySectionProps) {
  const [filter, setFilter] = useState<'all' | 'tournaments' | 'training' | 'facilities'>('all');

  const filteredGallery = galleryData.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section className="py-20 bg-slate-50" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Moments Of Glory
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase tracking-tight mb-4">
            Club Photo & Action Gallery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Relive unforgettable match moments, training camps, tournament celebrations, and arena facilities.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {[
            { label: 'All Photos', value: 'all' },
            { label: 'Tournaments', value: 'tournaments' },
            { label: 'Training Camps', value: 'training' },
            { label: 'Facilities', value: 'facilities' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value as any)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-heading font-bold transition-all ${
                filter === tab.value
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item, index, filteredGallery)}
              className="relative h-64 rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-auto self-end">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-heading font-bold text-base mb-1">{item.title}</h4>
                <span className="text-xs text-blue-300 uppercase tracking-wider font-semibold">
                  {item.categoryLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
