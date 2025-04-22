
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';
import ZipTooltip from './ZipTooltip';

const SummaryBanner: React.FC = () => {
  const { state } = useFinance();
  const { monthlyPayment, totalCost, estimateAccuracy, paymentType, zipCode } = state;
  const accuracyAdjustment = (100 - estimateAccuracy) / 100;
  const rangePercentage = accuracyAdjustment * 0.11;
  const lowerMonthly = monthlyPayment * (1 - rangePercentage);
  const upperMonthly = monthlyPayment * (1 + rangePercentage);
  const lowerTotal = totalCost * (1 - rangePercentage);
  const upperTotal = totalCost * (1 + rangePercentage);
  const showRange = estimateAccuracy < 85;

  return (
    <div className="sticky top-16 z-30 bg-[#F7F8FB] shadow-sm rounded-b-xl border-b border-[#1EAEDB] animate-fade-in font-semibold mt-16">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center font-bold text-[#1EAEDB] text-lg">
            <span>Estimated Payment</span>
            <span>
              <ZipTooltip zip={zipCode} />
            </span>
          </div>
          <div className="flex justify-between items-end pt-1">
            <div>
              {paymentType !== 'cash' && (
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#1EAEDB]">
                    {showRange
                      ? `${formatCurrency(lowerMonthly)}–${formatCurrency(upperMonthly)}`
                      : formatCurrency(monthlyPayment)}
                  </span>
                  <span className="text-base text-[#8E9196]">/mo</span>
                </div>
              )}
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold">
                  {showRange
                    ? `${formatCurrency(lowerTotal)}–${formatCurrency(upperTotal)}`
                    : formatCurrency(totalCost)}
                </span>
                <span className="text-xs text-[#8E9196]">total</span>
              </div>
            </div>
            {/* Accuracy bar */}
            <div className="flex flex-col items-end">
              <div className="h-2 w-16 bg-[#E6E8EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1EAEDB] transition-all duration-500 ease-out"
                  style={{ width: `${estimateAccuracy}%` }}
                ></div>
              </div>
              <span className="text-xs text-[#8E9196] mt-1">
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
