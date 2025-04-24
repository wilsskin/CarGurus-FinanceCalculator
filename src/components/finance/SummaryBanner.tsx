
import React, { useEffect, useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const SummaryBanner: React.FC = () => {
  const { state } = useFinance();
  const { monthlyPayment, totalCost, paymentType, loanDetails, tradeIn } = state;
  const [compact, setCompact] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setCompact(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`
      w-full transition-all duration-300 border-b border-[#E6E8EB] shadow-sm bg-white z-30
      ${compact ? "fixed top-0 left-0 right-0" : "relative"}
    `}>
      <div className="max-w-md mx-auto flex flex-row items-center justify-between px-3 py-2">
        {/* Left: Label */}
        <div className="flex flex-col">
          <span className={`font-extrabold text-[#101325] whitespace-nowrap ${compact ? 'text-xs' : 'text-sm'}`}>
            {paymentType === 'cash' ? 'Estimated Taxes & Fees' : 'Estimated Payment'}
          </span>
          {/* Financial details - show even in compact mode for better visibility */}
          {paymentType !== 'cash' && (
            <div className="text-xs text-[#8E9196] mt-1 space-x-2">
              <span>{loanDetails.termMonths / 12} years</span>
              <span>•</span>
              <span>${formatCurrency(loanDetails.downPayment)} down</span>
              {tradeIn.netValue > 0 && (
                <>
                  <span>•</span>
                  <span>${formatCurrency(tradeIn.netValue)} trade-in</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right: Payment Info */}
        <div className="flex items-center gap-4">
          {paymentType === 'cash' ? (
            <div className="flex flex-col items-end min-w-[75px]">
              <span className="text-[10px] text-[#8E9196] font-semibold leading-tight">
                Total with Tax
              </span>
              <span className="font-extrabold text-[#1EAEDB] text-lg leading-tight">
                {formatCurrency(totalCost)}
              </span>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-end min-w-[75px]">
                <span className="text-[10px] text-[#8E9196] font-semibold leading-tight">
                  Monthly
                </span>
                <span className={`font-extrabold text-[#1EAEDB] ${compact ? "text-base" : "text-lg"} leading-tight`}>
                  {formatCurrency(monthlyPayment)}
                </span>
              </div>
              <div className="flex flex-col items-end min-w-[75px]">
                <span className="text-[10px] text-[#8E9196] font-semibold leading-tight">
                  Total
                </span>
                <span className={`font-extrabold text-[#101325] ${compact ? "text-xs" : "text-sm"} leading-tight`}>
                  {formatCurrency(totalCost)}
                </span>
              </div>
            </>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-[#8E9196]" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">This is an estimate based on the info you've entered. Actual pricing may vary.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default SummaryBanner;
