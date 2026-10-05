'use client';

import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isOpen: boolean;
}

export default function Toast({ message, type, isOpen }: ToastProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-secondary text-white px-5 py-3.5 rounded-2xl shadow-2xl border-l-4 border-emerald-500 animate-in slide-in-from-bottom duration-300 max-w-md">
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-accent flex-shrink-0" />
      )}
      <p className="text-xs sm:text-sm font-medium leading-normal">{message}</p>
    </div>
  );
}
