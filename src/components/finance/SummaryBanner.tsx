
import React, { useEffect, useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const SummaryBanner: React.FC = () => {
  const { state } = useFinance();
  const { monthlyPayment, totalCost, paymentType } = state;
  const [compact, setCompact] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setCompact(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate estimate completion percentage based on all relevant fields
  const calculateEstimateCompletion = () => {
    if (paymentType === 'cash') return 100;
    
    let completionScore = 0;
    let totalItems = 0;
    
    // Required fields with weights
    const requiredFields = [
      { value: state.carPrice > 0, weight: 30 },
      { value: state.loanDetails.termMonths > 0, weight: 25 },
      { value: state.loanDetails.downPayment > 0, weight: 25 },
      { value: state.loanDetails.interestRate > 0, weight: 20 }
    ];
    
    requiredFields.forEach(field => {
      if (field.value) {
        completionScore += field.weight;
      }
      totalItems += field.weight;
    });
    
    return Math.round((completionScore / totalItems) * 100);
  };

  const completionPercentage = calculateEstimateCompletion();

  // Generate segments for the progress indicator
  const segments = [25, 50, 75, 100];

  return (
    <div className={`
      w-full transition-all duration-300 border-b border-[#E6E8EB] shadow-sm bg-white z-30
      ${compact ? "fixed top-0 left-0 right-0" : "relative"}
    `}>
      <div className="max-w-md mx-auto flex flex-col px-3 py-2">
        <div className="flex items-center justify-between">
          {/* Left: Labels */}
          <div className="flex flex-col space-y-1">
            <span className={`font-extrabold text-[#101325] whitespace-nowrap ${compact ? 'text-xs' : 'text-sm'}`}>
              {paymentType === 'cash' ? 'Estimated Taxes & Fees' : 'Estimated Payment'}
            </span>
            {paymentType !== 'cash' && (
              <>
                <span className="text-xs text-[#8E9196]">
                  Estimate Confidence: {completionPercentage}%
                </span>
                <div className="flex gap-1 h-1.5">
                  {segments.map((segment, index) => (
                    <div
                      key={segment}
                      className={`flex-1 rounded-full transition-colors duration-300 ${
                        completionPercentage >= segment 
                          ? 'bg-[#1EAEDB]' 
                          : 'bg-[#E6E8EB]'
                      }`}
                    />
                  ))}
                </div>
              </>
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

        {/* Missing Fields Hint */}
        {paymentType !== 'cash' && completionPercentage < 100 && (
          <div className="mt-1">
            <span className="text-xs text-[#1EAEDB]">
              {!state.carPrice && "Enter vehicle price • "}
              {!state.loanDetails.termMonths && "Add loan term • "}
              {!state.loanDetails.downPayment && "Add down payment • "}
              {!state.loanDetails.interestRate && "Add interest rate"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryBanner;
