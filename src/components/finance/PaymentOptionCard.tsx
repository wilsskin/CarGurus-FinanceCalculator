
import React from 'react';
import { PaymentType } from '../../types/financeTypes';

interface PaymentOptionCardProps {
  value: PaymentType;
  label: string;
  description: string;
  isSelected: boolean;
  onChange: (value: PaymentType) => void;
}

/**
 * Animated card component for payment option selection
 */
const PaymentOptionCard: React.FC<PaymentOptionCardProps> = ({
  value,
  label,
  description,
  isSelected,
  onChange
}) => {
  return (
    <button
      className={`
        flex items-start p-4 rounded-lg transition-all duration-300 transform
        ${isSelected 
          ? 'bg-finance-purple text-white shadow-md scale-[1.02]' 
          : 'bg-gray-100 hover:bg-finance-purple-light text-gray-800 hover:scale-[1.01]'}
      `}
      onClick={() => onChange(value)}
    >
      <div className="flex-1 text-left">
        <div className={`text-lg font-medium ${isSelected ? 'text-white' : 'text-gray-800'}`}>
          {label}
        </div>
        <div className={`text-sm mt-1 ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
          {description}
        </div>
      </div>
      
      <div className="ml-3">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
          ${isSelected 
            ? 'border-white' 
            : 'border-gray-400'
          }`}
        >
          {isSelected && (
            <div className="w-3 h-3 rounded-full bg-white animate-scale-in"></div>
          )}
        </div>
      </div>
    </button>
  );
};

export default PaymentOptionCard;
