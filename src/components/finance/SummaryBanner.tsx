
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';

/**
 * A sticky banner that displays the monthly payment and total cost estimates
 */
const SummaryBanner: React.FC = () => {
  const { state } = useFinance();
  const { monthlyPayment, totalCost, estimateAccuracy, paymentType } = state;

  // Calculate a range based on accuracy (less accurate = wider range)
  const accuracyAdjustment = (100 - estimateAccuracy) / 100;
  const rangePercentage = accuracyAdjustment * 0.15; // Maximum 15% range when accuracy is low
  
  const lowerMonthly = monthlyPayment * (1 - rangePercentage);
  const upperMonthly = monthlyPayment * (1 + rangePercentage);
  
  const lowerTotal = totalCost * (1 - rangePercentage);
  const upperTotal = totalCost * (1 + rangePercentage);

  // Only show a range if the accuracy is below 85%
  const showRange = estimateAccuracy < 85;
  
  return (
    <div className="sticky top-0 z-30 bg-white shadow-md rounded-b-lg border-b border-finance-purple-light animate-fade-in">
      <div className="max-w-md mx-auto p-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-gray-700">Estimated Payment</h2>
            {estimateAccuracy < 100 && (
              <div className="text-xs text-finance-gray-neutral flex items-center">
                <div className="w-2 h-2 rounded-full bg-finance-purple mr-1"></div>
                Estimate
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              {paymentType !== 'cash' && (
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-finance-purple">
                    {showRange ? (
                      <>
                        {formatCurrency(lowerMonthly)}-{formatCurrency(upperMonthly)}
                      </>
                    ) : (
                      formatCurrency(monthlyPayment)
                    )}
                  </span>
                  <span className="text-sm text-finance-gray-neutral ml-1">/mo</span>
                </div>
              )}
              <div className="flex items-baseline mt-1">
                <span className="text-lg font-semibold">
                  {showRange ? (
                    <>
                      {formatCurrency(lowerTotal)}-{formatCurrency(upperTotal)}
                    </>
                  ) : (
                    formatCurrency(totalCost)
                  )}
                </span>
                <span className="text-xs text-finance-gray-neutral ml-1">total</span>
              </div>
            </div>
            
            {/* Accuracy meter */}
            <div className="flex flex-col items-end">
              <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-finance-purple transition-all duration-500 ease-out"
                  style={{ width: `${estimateAccuracy}%` }}
                ></div>
              </div>
              <span className="text-xs text-finance-gray-neutral mt-1">
                {estimateAccuracy < 75 ? 'Keep adding details' : 'Good estimate'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBanner;
