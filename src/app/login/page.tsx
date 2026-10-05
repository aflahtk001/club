'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Trophy, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, signUp, signOut } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    if (mode === 'login') {
      const res = await signIn(email, password);
      setLoading(false);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg('Logged in successfully! Redirecting...');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    } else {
      if (!fullName) {
        setErrorMsg('Please enter your full name');
        setLoading(false);
        return;
      }
      const res = await signUp(email, password, fullName);
      setLoading(false);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg('Account created successfully! You are now logged in.');
        setTimeout(() => {
          router.push('/');
        }, 1200);
      }
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home link */}
      <div className="max-w-md w-full mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to APEX Sports Club
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 border border-slate-100">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-3">
            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
          </Link>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-secondary uppercase tracking-tight">
            {mode === 'login' ? 'Member Sign In' : 'Create Member Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'login'
              ? 'Access your court bookings, tournament passes, and profile'
              : 'Join the APEX community for exclusive court booking perks'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-lg font-heading text-xs font-bold transition-all ${
              mode === 'login'
                ? 'bg-white text-secondary shadow-sm'
                : 'text-slate-500 hover:text-secondary'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-lg font-heading text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'bg-white text-secondary shadow-sm'
                : 'text-slate-500 hover:text-secondary'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Status Messages */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1.5">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-primary focus:bg-white outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="athlete@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-primary focus:bg-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold text-secondary uppercase mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-primary focus:bg-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-sm rounded-xl shadow-blue transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-60 mt-2"
          >
            {loading ? (
              'Processing...'
            ) : mode === 'login' ? (
              <>Sign In <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>Create Account <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Powered securely by <strong>Supabase Authentication</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
