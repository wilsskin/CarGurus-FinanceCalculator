
import React, { useEffect, useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';
import { Car } from 'lucide-react';

const SummaryBanner: React.FC = () => {
  const { state } = useFinance();
  const { monthlyPayment, totalCost, estimateAccuracy, paymentType } = state;

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
        w-full transition-all duration-300 border-b border-[#E6E8EB] shadow-sm bg-white z-10
        ${compact ? "py-2" : "py-4"}
        ${compact ? "animate-fade-in" : ""}
      `}
      style={{
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        fontWeight: 600,
      }}
      data-testid="SummaryBanner"
    >
      <div className={`max-w-md mx-auto flex items-center gap-3 px-4 ${compact ? 'py-1' : 'py-2'}`}>
        <span className={compact ? "text-[#1EAEDB]" : "text-[#1EAEDB]"}>
          <Car
            className={compact ? "w-5 h-5" : "w-7 h-7"}
            strokeWidth={2.3}
          />
        </span>
        <span className={`font-extrabold ${compact ? 'text-lg' : 'text-2xl'} text-[#101325]`}>
          Finance Calculator
        </span>
        <div className="flex-1" />
        <div className="flex flex-row gap-7 items-center">
          <div className="flex flex-col items-end">
            <span className={`text-xs ${compact ? "text-[#8E9196]" : "text-[#8E9196]"} font-semibold`}>
              Monthly Payment
            </span>
            <span className={`font-extrabold ${compact ? "text-xl" : "text-3xl"} text-[#1EAEDB] leading-tight`}>
              {formatCurrency(monthlyPayment)}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-xs ${compact ? "text-[#8E9196]" : "text-[#8E9196]"} font-semibold`}>
              Total Cost
            </span>
            <span className={`font-extrabold ${compact ? "text-lg" : "text-xl"} text-[#101325] leading-tight`}>
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>
      </div>
      <div className={`text-xs text-[#8E9196] italic px-4 ${compact ? "pb-0 pt-1" : "pb-1 pt-2"}`}>
        Estimated — Actual numbers may vary.
      </div>
    </div>
  );
};

export default SummaryBanner;
