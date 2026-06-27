import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, #4ea9e5 0%, #0050b5 50%, #00125c 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8">About TSCF</h1>
        
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">Who We Are</h2>
            <p className="text-white/90 leading-relaxed">
              Tertiary Students Christian Fellowship (TSCF) is a movement of graduates 
              committed to impacting the marketplace and the nation through kingdom 
              transformation. We believe in raising gatekeepers who will influence 
              every sector of society for Christ.
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">Our Purpose</h2>
            <p className="text-white/90 leading-relaxed">
              To mobilize and facilitate the movement of graduates to impact the 
              marketplace and the nation towards national salvation and transformation.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Our Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <span className="text-white font-semibold">Truth</span>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <span className="text-white font-semibold">Servant Leadership</span>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <span className="text-white font-semibold">Integrity</span>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <span className="text-white font-semibold">Teamwork</span>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <span className="text-white font-semibold">Empowerment</span>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <span className="text-white font-semibold">Partnership</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
