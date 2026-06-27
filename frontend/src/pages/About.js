import React from "react";
import logo from "../assets/tscf-logo.png";

export default function About() {
  return (
    <div className="container section-spacing">

      <div className="glass-card">

        <div style={{ textAlign: "center" }}>

          <img
            src={logo}
            alt="TSCF Logo"
            style={{
              width: "220px",
              marginBottom: "20px"
            }}
          />

          <h1>About TSCF Campus Ministry</h1>

        </div>

        <p style={{ marginTop: "20px" }}>
          Tertiary Students Christian Fellowship (TSCF)
          exists to reach, disciple, train and mobilize
          students and graduates to become Christ-centered
          leaders who influence society.
        </p>

        <p style={{ marginTop: "20px" }}>
          Through fellowship, discipleship, leadership
          development, theological training and strategic
          partnerships, TSCF seeks to raise graduates who
          will serve Christ faithfully in every sphere of
          Papua New Guinea.
        </p>

      </div>

    </div>
  );
}
