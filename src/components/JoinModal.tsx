'use client';

import React, { useState, useEffect } from 'react';
import { X, IdCard, CheckCircle2 } from 'lucide-react';
import { ClubService } from '@/services/clubService';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillPlanOrSport?: string;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function JoinModal({
  isOpen,
  onClose,
  prefillPlanOrSport = '',
  onShowToast,
}: JoinModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ageGroup: 'Adult (22-45)',
    sport: 'All Multi-Sports',
    plan: 'Pro Athlete',
    notes: '',
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefillPlanOrSport) {
      if (['Club Starter', 'Pro Athlete', 'VIP Champion Squad'].includes(prefillPlanOrSport)) {
        setFormData((prev) => ({ ...prev, plan: prefillPlanOrSport }));
      } else {
        setFormData((prev) => ({ ...prev, sport: prefillPlanOrSport }));
      }
    }
  }, [prefillPlanOrSport]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms) {
      onShowToast('Please accept the club safety guidelines', 'error');
      return;
    }

    setIsSubmitting(true);
    const res = await ClubService.submitRegistration({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      ageGroup: formData.ageGroup,
      sport: formData.sport,
      plan: formData.plan,
      notes: formData.notes,
    });
    setIsSubmitting(false);

    if (res.success) {
      onShowToast(
        `Welcome ${formData.name}! Your membership request for ${formData.plan} (${formData.sport}) has been recorded.`,
        'success'
      );
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        ageGroup: 'Adult (22-45)',
        sport: 'All Multi-Sports',
        plan: 'Pro Athlete',
        notes: '',
        terms: false,
      });
    } else {
      onShowToast(`Failed to register: ${res.error || 'Please try again'}`, 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <IdCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-black text-xl text-secondary">
              Join APEX Sports Club
            </h3>
            <p className="text-xs text-slate-500">
              Start your athletic journey with premier club perks
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Alex Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-primary focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-primary focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 234-5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-primary focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1">
                Age Category *
              </label>
              <select
                value={formData.ageGroup}
                onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-primary focus:bg-white outline-none"
              >
                <option value="Junior (Under 16)">Junior (Under 16)</option>
                <option value="Youth (16-21)">Youth (16-21)</option>
                <option value="Adult (22-45)">Adult (22-45)</option>
                <option value="Senior Masters (45+)">Senior Masters (45+)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1">
                Primary Sport *
              </label>
              <select
                value={formData.sport}
                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-primary focus:bg-white outline-none"
              >
                <option value="All Multi-Sports">All Multi-Sports (Full Access)</option>
                <option value="Football">Football / Futsal</option>
                <option value="Cricket">Cricket</option>
                <option value="Basketball">Basketball</option>
                <option value="Badminton">Badminton</option>
                <option value="Tennis">Tennis</option>
                <option value="Swimming">Swimming</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1">
                Membership Plan *
              </label>
              <select
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-primary focus:bg-white outline-none"
              >
                <option value="Club Starter">Club Starter ($39/mo)</option>
                <option value="Pro Athlete">Pro Athlete ($79/mo)</option>
                <option value="VIP Champion Squad">VIP Champion Squad ($129/mo)</option>
                <option value="Gear Order / Trial">Single Trial / Gear Pass</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1">
              Court Preferences / Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Left-handed player, weekend morning slot"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-primary focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
              className="mt-1 rounded text-primary focus:ring-primary cursor-pointer"
            />
            <label htmlFor="termsCheckbox" className="text-xs text-slate-500 cursor-pointer">
              I agree to the APEX Sports Club code of conduct and safety regulations.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-primary hover:bg-primary-hover shadow-blue transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-60"
          >
            <CheckCircle2 className="w-4 h-4" /> {isSubmitting ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}
