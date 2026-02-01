import React, { useState } from 'react';
import { Info, CheckCircle, AlertTriangle, X } from 'lucide-react';

interface TipCardProps {
  tipText: string;
  tipType?: 'info' | 'success' | 'warning';
  dismissible?: boolean;
}

const TipCard: React.FC<TipCardProps> = ({ 
  tipText, 
  tipType = 'info',
  dismissible = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  const styles = {
    info: 'bg-accent text-primary border-primary/20',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200'
  };
  
  const icons = {
    info: <Info className="w-5 h-5 flex-shrink-0" />,
    success: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 flex-shrink-0" />
  };
  
  return (
    <div className={`${styles[tipType]} rounded-cg p-4 border flex items-start gap-3`}>
      {icons[tipType]}
      
      <p className="flex-1 text-body-sm">{tipText}</p>
      
      {dismissible && (
        <button 
          className="text-current opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default TipCard;
