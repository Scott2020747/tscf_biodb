import React from "react";

export default function GlassCard({
  title,
  children
}) {

  return (

    <div className="glass-card">

      <h2>{title}</h2>

      {children}

    </div>

  );
}
