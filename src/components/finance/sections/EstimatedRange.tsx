import React from 'react';
import { useFinance } from '@/context/finance';
import { Info } from 'lucide-react';
import { formatCurrency } from '@/utils/financeCalculator';

const EstimatedRange: React.FC = () => {
  const { state } = useFinance();
  const { loanDetails } = state;
  
  // Check if we can calculate meaningful ranges
  const canCalculateRange = loanDetails.termMonths > 0 && 
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
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h4>Estimated Ranges</h4>
        <Info className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background rounded-cg border border-border p-4">
          <div className="text-caption text-muted-foreground mb-1">Monthly Range</div>
          <div className="text-price-sm text-foreground">
            {canCalculateRange ? 
              `${formatCurrency(minMonthly)} – ${formatCurrency(maxMonthly)}` : 
              '—'}
          </div>
        </div>

        <div className="bg-background rounded-cg border border-border p-4">
          <div className="text-caption text-muted-foreground mb-1">Total Range</div>
          <div className="text-price-sm text-foreground">
            {formatCurrency(minEstimate)} – {formatCurrency(maxEstimate)}
          </div>
        </div>
      </div>

      <div className="text-body-sm text-muted-foreground">
        <p className="mb-2">Range may vary based on:</p>
        <ul className="list-disc pl-5 space-y-1">
          {loanDetails.interestRate > 0 && (
            <li>Final interest rate approval</li>
          )}
          <li>Available dealer incentives</li>
          <li>Taxes and fees</li>
        </ul>
      </div>
    </section>
  );
};

export default EstimatedRange;
