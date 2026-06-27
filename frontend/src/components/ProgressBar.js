import React from "react";

export default function ProgressBar({
  currentStep,
  totalSteps
}) {

  const progress =
    (currentStep / totalSteps) * 100;

  return (

    <div className="wizard-progress">

      <div className="wizard-progress-info">

        <span>
          Step {currentStep} of {totalSteps}
        </span>

        <span>
          {Math.round(progress)}%
        </span>

      </div>

      <div className="wizard-progress-bar">

        <div
          className="wizard-progress-fill"
          style={{
            width: `${progress}%`
          }}
        />

      </div>

    </div>

  );
}
