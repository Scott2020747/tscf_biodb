import React from 'react';
import { FaCross } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-3">
          <FaCross className="text-yellow-400" />
          <span className="font-semibold">Tertiary Students Christian Fellowship</span>
        </div>
        <p className="text-sm opacity-80">P. O. Box 6329 Port Boroko, National Capital District</p>
        <p className="text-sm opacity-80 mb-4">Mobile: 73277901</p>
        <p className="text-sm">TSCF Vision Partners Application Form 2026</p>
        <p className="text-xs opacity-60 mt-4">&copy; Tertiary Students Christian Fellowship 2026. All rights reserved.</p>
      </div>
    </footer>
  );
}
