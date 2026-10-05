'use client';

import React, { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SportsSection from '@/components/SportsSection';
import FixturesSection from '@/components/FixturesSection';
import AwardsSection from '@/components/AwardsSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import MembershipSection from '@/components/MembershipSection';
import CoachesSection from '@/components/CoachesSection';
import GallerySection from '@/components/GallerySection';
import NewsSection from '@/components/NewsSection';
import MerchandiseSection from '@/components/MerchandiseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import JoinModal from '@/components/JoinModal';
import LightboxModal from '@/components/LightboxModal';
import Toast from '@/components/Toast';
import { GalleryItem } from '@/data/clubData';
import { ClubService } from '@/services/clubService';

export default function HomePage() {
  // Join Modal state
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [prefillPlanOrSport, setPrefillPlanOrSport] = useState('');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxItems, setLightboxItems] = useState<GalleryItem[]>([]);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isOpen: boolean }>({
    message: '',
    type: 'success',
    isOpen: false,
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, isOpen: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isOpen: false }));
    }, 4500);
  };

  const handleOpenJoinModal = (planOrSport?: string) => {
    setPrefillPlanOrSport(planOrSport || '');
    setJoinModalOpen(true);
  };

  const handleOpenLightbox = (item: GalleryItem, index: number, list: GalleryItem[]) => {
    setLightboxItem(item);
    setLightboxIndex(index);
    setLightboxItems(list);
    setLightboxOpen(true);
  };

  const handleNavigateLightbox = (newIndex: number) => {
    if (lightboxItems.length > 0) {
      setLightboxIndex(newIndex);
      setLightboxItem(lightboxItems[newIndex]);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Top Info Bar */}
      <TopBar />

      {/* Main Sticky Navbar */}
      <Navbar onOpenJoinModal={handleOpenJoinModal} />

      {/* Hero Section */}
      <Hero onOpenJoinModal={handleOpenJoinModal} />

      {/* Sports Disciplines */}
      <SportsSection onOpenJoinModal={handleOpenJoinModal} />

      {/* Match Fixtures & Live Scoreboard */}
      <FixturesSection onOpenJoinModal={handleOpenJoinModal} />

      {/* Awards & Championship Legacy */}
      <AwardsSection />

      {/* World-class Facilities */}
      <FacilitiesSection />

      {/* Flexible Membership Pricing */}
      <MembershipSection onOpenJoinModal={handleOpenJoinModal} />

      {/* Pro Coaching Staff */}
      <CoachesSection />

      {/* Photo & Action Gallery */}
      <GallerySection onOpenLightbox={handleOpenLightbox} />

      {/* Club News & Events */}
      <NewsSection />

      {/* Merchandise Showcase */}
      <MerchandiseSection onOpenJoinModal={handleOpenJoinModal} />

      {/* Member Testimonials */}
      <TestimonialsSection />

      {/* Contact & Free Trial Session */}
      <ContactSection onShowToast={showToast} />

      {/* Footer */}
      <Footer onShowToast={showToast} />

      {/* Interactive Registration / Join Modal */}
      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        prefillPlanOrSport={prefillPlanOrSport}
        onShowToast={showToast}
      />

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        currentItem={lightboxItem}
        currentIndex={lightboxIndex}
        items={lightboxItems}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleNavigateLightbox}
      />

      {/* Toast Notification Alert */}
      <Toast message={toast.message} type={toast.type} isOpen={toast.isOpen} />
    </main>
  );
}
