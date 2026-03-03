'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function FlyerModal() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-50"
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close flyer"
          className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Flyer Image */}
        <img
          src="/Flyer/NIIS2026_Flyer.png"
          alt="NIIS 2026 Flyer"
          className="block max-w-[95vw] max-h-[95vh] object-contain"
        />
      </div>
    </div>
  );
}
