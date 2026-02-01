
import React from 'react';

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
  labels?: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  labels
}) => {
  const percentage = (currentStep / steps) * 100;

  return (
    <div className="mb-6 font-bold text-base">
      <div className="flex justify-between items-center mb-2">
        <span className="text-primary">
          {labels && labels[currentStep - 1]}
        </span>
        <span className="text-xs text-muted-foreground font-normal">
          {currentStep} of {steps} completed
        </span>
      </div>
      <div className="h-2 bg-accent rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
