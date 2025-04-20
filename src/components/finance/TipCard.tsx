
import React, { useState } from 'react';

interface TipCardProps {
  tipText: string;
  tipType?: 'info' | 'success' | 'warning';
  dismissible?: boolean;
}

/**
 * Component for displaying helpful tips and guidance
 */
const TipCard: React.FC<TipCardProps> = ({ 
  tipText, 
  tipType = 'info',
  dismissible = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  const bgColors = {
    info: 'bg-finance-blue-soft text-finance-blue-bright',
    success: 'bg-green-50 text-green-600',
    warning: 'bg-amber-50 text-amber-600'
  };
  
  const icons = {
    info: (
      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  };
  
  return (
    <div className={`${bgColors[tipType]} rounded-lg p-4 mb-4 animate-fade-in flex items-start`}>
      {icons[tipType]}
      
      <div className="flex-1">
        <p className="text-sm">{tipText}</p>
      </div>
      
      {dismissible && (
        <button 
          className="ml-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsVisible(false)}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default TipCard;
