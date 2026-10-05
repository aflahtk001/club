'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trophy, ArrowRight, Lock, ShieldCheck, Award, Settings } from 'lucide-react';
import { ClubService } from '@/services/clubService';

interface FooterProps {
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function Footer({ onShowToast }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    const res = await ClubService.subscribeNewsletter(email);
    setIsSubmitting(false);

    if (res.success) {
      onShowToast('You have subscribed to the Apex Club Newsletter!', 'success');
      setEmail('');
    } else {
      onShowToast(`Subscription failed: ${res.error || 'Please try again'}`, 'error');
    }
  };

  return (
    <footer className="bg-secondary-dark text-slate-400 pt-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col">
            <a href="#home" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-md">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl text-white leading-none tracking-tight">APEX</span>
                <span className="font-heading font-bold text-[10px] tracking-[0.2em] text-accent">SPORTS CLUB</span>
              </div>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Premier multi-sport destination dedicated to nurturing athletic potential, organizing competitive leagues, and building a passionate sports community.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Certified Sports Complex</span>
              <span className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> National League Affiliate</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#sports" className="hover:text-white transition-colors">Sports Arenas</a></li>
              <li><a href="#fixtures" className="hover:text-white transition-colors">Fixtures & Scores</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors">Facilities & Gym</a></li>
              <li><a href="#membership" className="hover:text-white transition-colors">Membership Plans</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Media Gallery</a></li>
              <li>
                <Link href="/admin" className="text-primary hover:underline font-bold flex items-center gap-1 mt-2">
                  <Settings className="w-3.5 h-3.5" /> Club Manager CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Academies */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">Academies</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#sports" className="hover:text-white transition-colors">Football Academy</a></li>
              <li><a href="#sports" className="hover:text-white transition-colors">Cricket Batting Nets</a></li>
              <li><a href="#sports" className="hover:text-white transition-colors">Basketball League</a></li>
              <li><a href="#sports" className="hover:text-white transition-colors">Badminton Courts</a></li>
              <li><a href="#sports" className="hover:text-white transition-colors">ITF Tennis Training</a></li>
              <li><a href="#sports" className="hover:text-white transition-colors">Olympic Aquatics</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">Club Newsletter</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Subscribe for weekly fixture schedules, coaching tips, and early bird tournament access.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2 mb-3">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl transition-colors flex items-center justify-center shadow-blue disabled:opacity-60"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
              <Lock className="w-3 h-3" /> We respect your privacy. No spam.
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} APEX Sports Club. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Membership</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Court Safety Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
