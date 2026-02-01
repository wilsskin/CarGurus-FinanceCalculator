import React, { useEffect, useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';
import { ChevronLeft } from 'lucide-react';

const SummaryBanner: React.FC = () => {
  const { state } = useFinance();
  const { monthlyPayment, totalCost, paymentType } = state;
  const [isSticky, setIsSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Become sticky after scrolling past the page header
      setIsSticky(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`
        w-full bg-background border-b border-border transition-all duration-300 z-50
        ${isSticky ? 'fixed top-0 left-0 right-0 shadow-sm' : ''}
      `}
    >
      <div className="mx-auto max-w-md px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side: Back button (only when sticky) + Header */}
          <div className="flex items-center gap-1">
            {/* Back Button - Simple icon, only show when sticky */}
            {isSticky && (
              <button 
                className="p-1 -ml-1 hover:bg-accent rounded-full transition-colors duration-200"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
            )}
            
            {/* Header Text */}
            <span className="text-sm font-semibold text-foreground">
              {paymentType === 'cash' ? 'Estimated Total' : 'Estimated Payment'}
            </span>
          </div>

          {/* Right side: Cost values - Compact like CarGurus */}
          <div className="flex items-center gap-2">
            {paymentType === 'cash' ? (
              <span className="text-base font-bold text-foreground">
                {formatCurrency(totalCost)}
              </span>
            ) : (
              <>
                <span className="text-base font-bold text-foreground">
                  {formatCurrency(monthlyPayment)}<span className="text-xs font-normal text-muted-foreground">/mo</span>
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="text-base font-bold text-foreground">
                  {formatCurrency(totalCost)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBanner;
