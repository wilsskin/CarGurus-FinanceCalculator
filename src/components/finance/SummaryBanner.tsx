
import React, { useEffect, useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Progress } from '../ui/progress';

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

  // Calculate estimate completion percentage
  const calculateEstimateCompletion = () => {
    if (paymentType === 'cash') return 100;
    
    let completionScore = 0;
    let items = 0;
    
    // Loan term selected
    if (loanDetails.termMonths > 0) {
      completionScore += 1;
    }
    items += 1;
    
    // Down payment entered
    if (loanDetails.downPayment > 0) {
      completionScore += 1;
    }
    items += 1;
    
    // Trade-in value entered (optional)
    if (tradeIn.value > 0) {
      completionScore += 1;
    }
    items += 1;
    
    return Math.round((completionScore / items) * 100);
  };

  const completionPercentage = calculateEstimateCompletion();

  return (
    <div className={`
      w-full transition-all duration-300 border-b border-[#E6E8EB] shadow-sm bg-white z-30
      ${compact ? "fixed top-0 left-0 right-0" : "relative"}
    `}>
      <div className="max-w-md mx-auto flex flex-col px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          {/* Left: Label */}
          <div className="flex flex-col">
            <span className={`font-extrabold text-[#101325] whitespace-nowrap ${compact ? 'text-xs' : 'text-sm'}`}>
              {paymentType === 'cash' ? 'Estimated Taxes & Fees' : 'Estimated Payment'}
            </span>
            
            {/* Financial details - always show for non-cash payment types */}
            {paymentType !== 'cash' && (
              <div className="text-xs text-[#8E9196] mt-0.5 flex flex-wrap gap-1">
                <span className="whitespace-nowrap">{loanDetails.termMonths / 12} years</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap">Down Payment: {formatCurrency(loanDetails.downPayment)}</span>
                {tradeIn.netValue > 0 && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="whitespace-nowrap">{formatCurrency(tradeIn.netValue)} trade-in</span>
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

        {/* Estimate Confidence Bar */}
        {paymentType !== 'cash' && (
          <div className="mt-1">
            <Progress value={completionPercentage} className="h-1.5" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-[#8E9196]">
                Estimate {completionPercentage}% complete
              </span>
              {completionPercentage < 100 && (
                <span className="text-xs text-[#1EAEDB]">
                  {!loanDetails.termMonths && "Add loan term"}
                  {!loanDetails.downPayment && "Add down payment"}
                  {!tradeIn.value && "Add trade-in details"}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryBanner;
