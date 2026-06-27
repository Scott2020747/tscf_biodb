import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, #4ea9e5 0%, #0050b5 50%, #00125c 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-white/70 text-sm">Phone</p>
                  <p className="text-white font-semibold">+675 73277901</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-white/70 text-sm">Email</p>
                  <p className="text-white font-semibold">info@tscfpng.org</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-white/70 text-sm">Address</p>
                  <p className="text-white font-semibold">P. O. Box 6329</p>
                  <p className="text-white">Port Boroko, National Capital District</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">🏦 Banking Details</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-white/70 text-sm">Account Name</p>
                <p className="text-white font-semibold">Tertiary Students Christian Fellowship</p>
              </div>
              
              <div>
                <p className="text-white/70 text-sm">Account Number</p>
                <p className="text-white font-mono font-bold">1000435676</p>
              </div>
              
              <div>
                <p className="text-white/70 text-sm">Bank</p>
                <p className="text-white font-semibold">Bank South Pacific (BSP)</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-white/70 text-sm">BSB</p>
                  <p className="text-white font-mono font-bold">088-943</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">SWIFT</p>
                  <p className="text-white font-mono font-bold">BOSPPGPM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
