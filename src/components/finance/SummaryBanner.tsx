
import React, { useEffect, useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';

const SummaryBanner: React.FC = () => {
  const { state } = useFinance();
  const { monthlyPayment, totalCost, paymentType } = state;

  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setCompact(window.scrollY > 24); // compact after 24px of scroll
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show the banner if there are loan details (if payment type isn't cash)
  const showBanner = paymentType !== 'cash';
  if (!showBanner) return null;

  return (
    <div
      className={`
        w-full transition-all duration-300 border-b border-[#E6E8EB] shadow-sm bg-white z-30
        ${compact ? "py-1" : "py-2"}
        ${compact ? "animate-fade-in" : ""}
        ${compact ? "fixed top-0 left-0 right-0" : "relative"}
      `}
      style={{ fontWeight: 600 }}
      data-testid="SummaryBanner"
    >
      <div className={`max-w-md mx-auto flex flex-col px-3 items-center`}>
        <span className={`font-extrabold text-[#101325] ${compact ? 'text-sm' : 'text-lg'} mb-0.5 leading-none`}>
          Finance Calculator
        </span>
        <div className="flex flex-col items-center w-full">
          <span className={`text-[10px] text-[#8E9196] font-semibold ${compact ? "mb-0.5" : "mb-0.5"}`}>
            Monthly Payment
          </span>
          <span className={`font-extrabold text-[#1EAEDB] leading-tight ${compact ? "text-base" : "text-xl"}`}>
            {formatCurrency(monthlyPayment)}
          </span>
        </div>
        <div className="flex flex-col items-center mt-0.5 w-full">
          <span className="text-[10px] text-[#8E9196] font-semibold">
            Total Cost
          </span>
          <span className={`font-extrabold text-[#101325] leading-tight ${compact ? "text-sm" : "text-base"}`}>
            {formatCurrency(totalCost)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryBanner;
