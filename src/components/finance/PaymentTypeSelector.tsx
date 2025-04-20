

import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { PaymentType } from '../../types/financeTypes';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const paymentOptions = [
  { value: 'dealer', label: 'Dealer', icon: 'credit-card' },
  { value: 'outside', label: 'Outside Loan', icon: 'wallet' },
  { value: 'cash', label: 'Cash', icon: 'tag' }
] as const;

const PaymentTypeSelector: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { paymentType } = state;
  const [animationDelay, setAnimationDelay] = useState(true);

  const handlePaymentTypeChange = (type: PaymentType) => {
    dispatch({ type: 'SET_PAYMENT_TYPE', payload: type });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDelay(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 animate-scale-in">
      <h2 className="text-xl font-bold mb-4 text-[#1EAEDB]">How Are You Paying?</h2>
      <ToggleGroup type="single" value={paymentType} onValueChange={(v) => v && handlePaymentTypeChange(v as PaymentType)} className="flex w-full gap-2">
        {paymentOptions.map((option, idx) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            aria-label={option.label}
            className={`
              flex-1 flex flex-col items-center justify-center gap-2 px-0 py-4
              rounded-xl text-base font-semibold cursor-pointer border-2
              ${paymentType === option.value
                ? 'bg-[#1EAEDB] text-white border-[#1EAEDB] scale-105 shadow'
                : 'bg-[#F5F7F9] text-[#222] border-[#E6E8EB] hover:bg-[#E9F6FB]'
              }
              transition-all duration-300
              ${animationDelay ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
            `}
            style={{ transitionDelay: `${animationDelay ? 90 + idx * 70 : 0}ms` }}
          >
            <span className="mb-1 text-2xl">
              {option.icon === 'credit-card' && <span>💳</span>}
              {option.icon === 'wallet' && <span>👛</span>}
              {option.icon === 'tag' && <span>🏷️</span>}
            </span>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="mt-4 text-sm text-[#1EAEDB] flex items-center">
        <span>
          {paymentType === 'dealer'
            ? 'Dealer financing may offer special rates'
            : paymentType === 'outside'
              ? 'Outside loans often have competitive rates'
              : 'Cash payment simplifies the process'}
        </span>
      </div>
    </div>
  );
};

export default PaymentTypeSelector;
