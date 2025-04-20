
import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { PaymentType } from '../../types/financeTypes';
import PaymentOptionCard from './PaymentOptionCard';

/**
 * Component for selecting payment type (dealer financing, outside loan, cash)
 */
const PaymentTypeSelector: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { paymentType } = state;
  const [animationDelay, setAnimationDelay] = useState(true);

  const handlePaymentTypeChange = (type: PaymentType) => {
    dispatch({ type: 'SET_PAYMENT_TYPE', payload: type });
  };

  // Add a slight animation delay on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDelay(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const paymentOptions = [
    { value: 'dealer', label: 'Dealer Financing', description: 'Finance through the dealership' },
    { value: 'outside', label: 'Outside Loan', description: 'Use your own bank or credit union' },
    { value: 'cash', label: 'Cash', description: 'Pay the full amount upfront' }
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 animate-scale-in">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">How Are You Paying?</h2>
      
      <div className="grid grid-cols-1 gap-3">
        {paymentOptions.map((option, index) => (
          <div 
            key={option.value}
            className={`transition-all duration-500 ${
              animationDelay ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
            style={{ transitionDelay: `${animationDelay ? 100 + (index * 100) : 0}ms` }}
          >
            <PaymentOptionCard
              value={option.value}
              label={option.label}
              description={option.description}
              isSelected={paymentType === option.value}
              onChange={handlePaymentTypeChange}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-finance-gray-neutral">
        <div className={`flex items-center ${paymentType !== 'cash' ? 'text-finance-purple' : ''}`}>
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            {paymentType === 'dealer' 
              ? 'Dealer financing may offer special rates and incentives'
              : paymentType === 'outside'
                ? 'Outside loans often have competitive rates'
                : 'Cash payment simplifies the purchase process'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentTypeSelector;
