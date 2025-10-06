
import React from 'react';
import { useFinance } from '@/context/finance';
import { Info } from 'lucide-react';
import { formatCurrency } from '@/utils/financeCalculator';
import { Card } from '@/components/ui/card';

const EstimatedRange: React.FC = () => {
  const { state } = useFinance();
  const { paymentType, loanDetails } = state;
  
  // Check if we can calculate meaningful ranges
  const canCalculateRange = paymentType !== 'cash' && 
    loanDetails.termMonths > 0 && 
    loanDetails.interestRate > 0 &&
    state.monthlyPayment > 0;
  
  // Calculate cost range: base estimate ±5%
  const baseEstimate = state.totalCost;
  const minEstimate = Math.floor(baseEstimate * 0.95);
  const maxEstimate = Math.ceil(baseEstimate * 1.05);
  
  // Calculate monthly range: monthly payment ±5%
  const baseMonthly = state.monthlyPayment;
  const minMonthly = canCalculateRange ? Math.floor(baseMonthly * 0.95) : 0;
  const maxMonthly = canCalculateRange ? Math.ceil(baseMonthly * 1.05) : 0;

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-start gap-2">
            <h3 className="text-sm font-semibold text-gray-700">Estimated Ranges</h3>
            <Info className="w-4 h-4 text-[#8E9196] mt-0.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {paymentType !== 'cash' && (
              <Card className="p-4">
                <div className="text-sm text-[#8E9196] mb-2">Monthly Payment Range</div>
                <div className="text-lg font-bold text-[#0578BB]">
                  {canCalculateRange ? 
                    `${formatCurrency(minMonthly)} – ${formatCurrency(maxMonthly)}` : 
                    'Complete loan details first'}
                </div>
              </Card>
            )}

            <Card className={`p-4 ${paymentType === 'cash' ? 'md:col-span-2' : ''}`}>
              <div className="text-sm text-[#8E9196] mb-2">Total Cost Range</div>
              <div className="text-lg font-bold text-[#0578BB]">
                {formatCurrency(minEstimate)} – {formatCurrency(maxEstimate)}
              </div>
            </Card>
          </div>

          <div className="space-y-2 text-sm text-[#8E9196] text-center">
            <p>This range may vary based on:</p>
            <ul className="list-disc text-left pl-5 space-y-1">
              {paymentType !== 'cash' && loanDetails.interestRate > 0 && (
                <li>Final interest rate approval</li>
              )}
              <li>Available dealer incentives</li>
              <li>Selected add-ons and packages</li>
              {paymentType !== 'cash' && !canCalculateRange && (
                <li>Your loan term and APR selection</li>
              )}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EstimatedRange;
