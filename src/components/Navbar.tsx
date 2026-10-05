'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Trophy, CalendarCheck, IdCard, Menu, X, Zap, LogIn, LogOut, User, Settings } from 'lucide-react';

interface NavbarProps {
  onOpenJoinModal: (planOrSport?: string) => void;
}

export default function Navbar({ onOpenJoinModal }: NavbarProps) {
  const { user, isAdmin, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'sports', 'fixtures', 'awards', 'facilities', 'membership', 'coaches', 'gallery', 'news', 'merch', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Sports', href: '#sports', id: 'sports' },
    { label: 'Fixtures', href: '#fixtures', id: 'fixtures' },
    { label: 'Awards', href: '#awards', id: 'awards' },
    { label: 'Facilities', href: '#facilities', id: 'facilities' },
    { label: 'Membership', href: '#membership', id: 'membership' },
    { label: 'Coaches', href: '#coaches', id: 'coaches' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'News', href: '#news', id: 'news' },
    { label: 'Gear', href: '#merch', id: 'merch' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-slate-200 transition-all duration-300 ${isScrolled ? 'shadow-md py-1' : 'py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-gradient-to-br from-primary to-blue-900 text-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-2xl leading-none tracking-tight text-secondary">APEX</span>
            <span className="font-heading font-bold text-[10px] tracking-[0.2em] text-accent">SPORTS CLUB</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`font-heading text-xs font-semibold transition-colors relative py-1 ${
                activeSection === item.id ? 'text-primary' : 'text-slate-700 hover:text-primary'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* User Auth Section */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-secondary text-xs font-heading font-bold border border-slate-200 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                  {user.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="max-w-[100px] truncate hidden sm:inline">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-slate-100 text-xs">
                    <p className="font-bold text-secondary truncate">{user.user_metadata?.full_name || 'Member'}</p>
                    <p className="text-slate-400 text-[10px] truncate">{user.email}</p>
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary"
                    >
                      <Settings className="w-3.5 h-3.5" /> Club Manager CMS
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut();
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-heading font-bold text-slate-700 hover:text-primary bg-slate-100 hover:bg-primary/10 rounded-lg transition-colors border border-slate-200"
            >
              <LogIn className="w-3.5 h-3.5" />
              Log In
            </Link>
          )}

          <button
            onClick={() => onOpenJoinModal()}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-heading font-bold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-blue transition-all hover:-translate-y-0.5"
          >
            <IdCard className="w-4 h-4" />
            Join Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-800 hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-heading text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                  activeSection === item.id ? 'bg-primary/10 text-primary' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-heading font-bold text-white bg-primary rounded-lg shadow-md"
              >
                <Zap className="w-4 h-4" /> Join Club Today
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
