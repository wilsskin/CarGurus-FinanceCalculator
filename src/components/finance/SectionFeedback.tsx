
import React, { useState, useEffect } from 'react';

interface SectionFeedbackProps {
  message: string;
  visible: boolean;
  onHide?: () => void;
}

const SectionFeedback: React.FC<SectionFeedbackProps> = ({ 
  message, 
  visible, 
  onHide 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onHide && onHide();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-20 left-0 right-0 mx-auto w-4/5 max-w-sm animate-fade-in z-50">
      <div className="bg-finance-purple text-white py-2 px-4 rounded-full shadow-md flex items-center">
        <div className="bg-white text-finance-purple rounded-full w-5 h-5 flex items-center justify-center mr-2">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default SectionFeedback;
