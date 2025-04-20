
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
      <div className="flex justify-between items-center mb-1">
        <span className="text-[#1EAEDB]">
          {labels && labels[currentStep - 1]}
        </span>
        <span className="text-xs text-[#8E9196] font-normal">
          {currentStep} of {steps} completed
        </span>
      </div>
      <div className="h-2 bg-[#E9F6FB] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1EAEDB] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
