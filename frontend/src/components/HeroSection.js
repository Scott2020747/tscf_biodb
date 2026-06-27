import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {

  return (

    <section className="hero">

      <div className="hero-overlay">

        <h1>
          Transforming PNG Through Christian Graduates
        </h1>

        <p>
          Building Kingdom Leaders For National
          Transformation
        </p>

        <Link
          to="/register"
          className="hero-button"
        >
          Become A Vision Partner
        </Link>

      </div>

    </section>

  );
}
