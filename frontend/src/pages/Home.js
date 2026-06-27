import React from "react";
import HeroSection from "../components/HeroSection";
import GlassCard from "../components/GlassCard";

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="container">

        {/* Vision */}
        <section className="section-spacing">
          <h2 className="section-title">Our Vision</h2>

          <GlassCard title="National Transformation">
            <p>
              To mobilize and facilitate the movement of graduates to
              impact the marketplace and the nation towards national
              salvation and transformation.
            </p>
          </GlassCard>
        </section>

        {/* Mission */}
        <section className="section-spacing">
          <h2 className="section-title">Our Mission</h2>

          <GlassCard title="Kingdom Impact">
            <p>
              By promoting a kingdom mindset through divine alignment,
              strategic alliance, partnership and fellowship amongst
              graduates to become gatekeepers in our nation.
            </p>
          </GlassCard>
        </section>

        {/* Core Values */}
        <section className="section-spacing">
          <h2 className="section-title">Core Values</h2>

          <div className="values-grid">

            <GlassCard title="📖 Truth">
              God's Word is our foundation.
            </GlassCard>

            <GlassCard title="🤝 Servant Leadership">
              Leading through service.
            </GlassCard>

            <GlassCard title="🛡 Integrity">
              Character above convenience.
            </GlassCard>

            <GlassCard title="👥 Teamwork">
              Working together for impact.
            </GlassCard>

            <GlassCard title="🚀 Empowerment">
              Equipping future leaders.
            </GlassCard>

            <GlassCard title="🌏 Advocacy">
              Influencing society for Christ.
            </GlassCard>

          </div>
        </section>

        {/* Programs */}
        <section className="section-spacing">

          <h2 className="section-title">
            Graduate Development Programs
          </h2>

          <div className="values-grid">

            <GlassCard title="Moore Bible College">
              Biblical and theological training.
            </GlassCard>

            <GlassCard title="QTS">
              Queensland Theological Seminary.
            </GlassCard>

            <GlassCard title="Ministry Apprentice">
              Leadership development.
            </GlassCard>

            <GlassCard title="Corporate Training">
              Marketplace impact preparation.
            </GlassCard>

            <GlassCard title="Conferences">
              National and regional networking.
            </GlassCard>

            <GlassCard title="Empowerment Training">
              Practical ministry and leadership.
            </GlassCard>

          </div>

        </section>

      </div>
    </>
  );
}
