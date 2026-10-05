'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { ClubService } from '@/services/clubService';

interface ContactSectionProps {
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function ContactSection({ onShowToast }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    sport: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await ClubService.submitInquiry({
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      sport: formData.sport,
      message: formData.message,
    });
    setIsSubmitting(false);

    if (res.success) {
      onShowToast(
        `Thank you ${formData.name}! Your inquiry for ${formData.sport || 'Club Trial'} has been submitted. We'll reach out within 2 hours.`,
        'success'
      );
      setFormData({ name: '', phone: '', email: '', sport: '', message: '' });
    } else {
      onShowToast(`Failed to send inquiry: ${res.error || 'Please try again'}`, 'error');
    }
  };

  return (
    <section className="py-20 bg-secondary text-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info */}
          <div className="lg:col-span-5">
            <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent-light bg-accent/20 border border-accent/40 px-3.5 py-1.5 rounded-full mb-3">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight mb-4">
              Visit The Apex Sports Complex
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Have questions regarding tournament registrations, corporate bookings, coaching trials or membership plans? Our club concierge is here to help.
            </p>

            {/* Details */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block font-heading font-bold text-sm text-white">Club Address</strong>
                  <p className="text-xs text-slate-400">450 Arena Boulevard, Sports City Metro District, SC 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block font-heading font-bold text-sm text-white">Front Desk & Hotline</strong>
                  <p className="text-xs text-slate-400">+1 (800) 555-APEX / +1 (800) 555-2739</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block font-heading font-bold text-sm text-white">Email Inquiries</strong>
                  <p className="text-xs text-slate-400">membership@apexsportsclub.com / info@apexsportsclub.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block font-heading font-bold text-sm text-white">Operating Hours</strong>
                  <p className="text-xs text-slate-400">Monday - Sunday: 05:30 AM – 11:00 PM (All 365 Days)</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-300">Follow Updates:</span>
              <div className="flex items-center gap-2">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-sky-500 text-white flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 text-slate-700 shadow-2xl">
              <h3 className="font-heading font-black text-2xl text-secondary mb-2">
                Book a Free Trial Session or Send Query
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-8">
                Fill in your details below and our team will get back to you within 2 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1.5">
                      Interested Sport *
                    </label>
                    <select
                      required
                      value={formData.sport}
                      onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="" disabled>Select Sport</option>
                      <option value="Football">Football / Soccer</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Badminton">Badminton</option>
                      <option value="Tennis">Tennis</option>
                      <option value="Swimming">Swimming</option>
                      <option value="Multi-Sport">Multi-Sport Membership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1.5">
                    Message / Preferred Timings
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your experience level or court requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-heading font-bold text-sm text-white bg-primary hover:bg-primary-hover shadow-blue transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" /> {isSubmitting ? 'Sending...' : 'Send Inquiry / Book Free Trial'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
