import React from "react";

export default function StepCard({
  title,
  children
}) {

  return (

    <div className="wizard-card">

      <h2 className="wizard-title">
        {title}
      </h2>

      {children}

    </div>

  );
}
