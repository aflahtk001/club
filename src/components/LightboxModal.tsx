'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/data/clubData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  currentItem: GalleryItem | null;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  isOpen,
  currentItem,
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + items.length) % items.length);
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors z-10"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % items.length);
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors z-10"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Content */}
      <div
        className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
            {currentItem.title}
          </h3>
          <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
            {currentItem.categoryLabel} ({currentIndex + 1} / {items.length})
          </span>
        </div>
      </div>
    </div>
  );
}
