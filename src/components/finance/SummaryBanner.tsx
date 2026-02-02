import React, { useEffect, useState } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '../../utils/financeCalculator';
import { ChevronLeft } from 'lucide-react';

const SummaryBanner: React.FC = () => {
  const { state } = useFinance();
  const { monthlyPayment, totalCost, loanDetails } = state;
  const noLoanDetails = !loanDetails.termMonths || !loanDetails.interestRate || loanDetails.interestRate === 0;
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
        w-full bg-background border-b border-border z-50
        ${isSticky ? 'fixed left-0 right-0 shadow-sm animate-banner-reveal' : 'transition-shadow duration-200 ease-out'}
      `}
      style={isSticky ? { 
        top: 'env(safe-area-inset-top, 0px)',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
      } : undefined}
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
            <span className="text-label font-semibold text-foreground">
              Estimated Payment
            </span>
          </div>

          {/* Right side: Cost values - Compact like CarGurus */}
          <div className="flex items-center gap-2">
            <span className="text-price-sm font-bold text-foreground">
              {noLoanDetails ? '—' : formatCurrency(monthlyPayment)}<span className="text-caption font-normal text-muted-foreground">/mo</span>
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-price-sm font-bold text-foreground">
              {noLoanDetails ? '—' : formatCurrency(totalCost)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBanner;
