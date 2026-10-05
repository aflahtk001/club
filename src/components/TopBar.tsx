'use client';

import React from 'react';
import { MapPin, Phone, Clock, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="hidden lg:block bg-secondary text-slate-300 text-xs py-2 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            450 Arena Boulevard, Sports City
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-accent" />
            +1 (800) 555-APEX
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            Mon - Sun: 05:30 AM - 11:00 PM
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-2 font-semibold text-slate-200">
            <span className="pulse-dot"></span> Arena Open Today
          </span>
          <div className="flex items-center gap-3 text-slate-400">
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-white transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
