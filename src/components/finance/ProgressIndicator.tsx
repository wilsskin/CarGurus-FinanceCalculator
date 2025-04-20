
import React from 'react';

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
  labels?: string[];
}

/**
 * A component to show progress through the finance calculator
 */
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  steps, 
  currentStep,
  labels
}) => {
  const percentage = (currentStep / steps) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-finance-purple">
          {labels && labels[currentStep - 1]}
        </span>
        <span className="text-xs text-finance-gray-neutral">
          {currentStep} of {steps} completed
        </span>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-finance-purple transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
