import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen py-12 px-4 tscf-gradient">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Welcome to TSCF Vision Partners
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Join the movement of graduates transforming nations
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/25 transition-all">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
            <p className="text-white/80 text-sm">
              Mobilizing graduates to impact the marketplace and nation
            </p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/25 transition-all">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
            <p className="text-white/80 text-sm">
              Promoting kingdom mindset through divine alignment
            </p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/25 transition-all">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2">Core Values</h3>
            <p className="text-white/80 text-sm">
              Truth, Servant Leadership, Integrity, Teamwork
            </p>
          </div>
        </div>

        <Link
          to="/register"
          className="inline-block bg-white text-blue-600 font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Register Now →
        </Link>
      </div>
    </div>
  );
}
