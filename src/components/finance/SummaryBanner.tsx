
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
        ${compact ? "py-0.5" : "py-2"}
        ${compact ? "fixed top-0 left-0 right-0" : "relative"}
      `}
      style={{ fontWeight: 600 }}
      data-testid="SummaryBanner"
    >
      <div className="max-w-md mx-auto flex flex-row items-center justify-between px-3">
        {/* Left: Label */}
        <span
          className={`font-extrabold text-[#101325] whitespace-nowrap ${compact ? 'text-xs' : 'text-sm'}`}
          style={{ minWidth: "0" }}
        >
          Finance Calculator
        </span>

        {/* Right: Payment Info */}
        <div className="flex gap-4 items-center">
          {/* Monthly Payment */}
          <div className="flex flex-col items-end min-w-[75px]">
            <span className={`text-[10px] text-[#8E9196] font-semibold leading-tight`}>
              Monthly
            </span>
            <span className={`font-extrabold text-[#1EAEDB] ${compact ? "text-base" : "text-lg"} leading-tight`}>
              {formatCurrency(monthlyPayment)}
            </span>
          </div>
          {/* Total Cost */}
          <div className="flex flex-col items-end min-w-[75px]">
            <span className="text-[10px] text-[#8E9196] font-semibold leading-tight">
              Total
            </span>
            <span className={`font-extrabold text-[#101325] ${compact ? "text-xs" : "text-sm"} leading-tight`}>
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBanner;
