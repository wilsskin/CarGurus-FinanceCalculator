import React from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import SaveAndExport from './SaveAndExport';

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
    <section className="space-y-5">
      <h3>Estimated Ranges</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background rounded-cg-lg border border-border py-5 px-4 min-h-[115px]">
          <div className="text-body-sm text-muted-foreground mb-2">Monthly Range</div>
          <div className="text-price-sm text-foreground tabular-nums whitespace-nowrap">
            {canCalculateRange ? 
              `${formatCurrency(minMonthly)} – ${formatCurrency(maxMonthly)}` : 
              '—'}
          </div>
        </div>

        <div className="bg-background rounded-cg-lg border border-border py-5 px-4 min-h-[115px]">
          <div className="text-body-sm text-muted-foreground mb-2">Total Range</div>
          <div className="text-price-sm text-foreground tabular-nums whitespace-nowrap">
            {formatCurrency(minEstimate)} – {formatCurrency(maxEstimate)}
          </div>
        </div>
      </div>

      <div className="text-body-sm text-muted-foreground">
        <p className="mb-2">Range may vary based on:</p>
        <ul className="space-y-1.5">
          {loanDetails.interestRate > 0 && (
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" aria-hidden="true" />
              <span>Final interest rate approval</span>
            </li>
          )}
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" aria-hidden="true" />
            <span>Available dealer incentives</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" aria-hidden="true" />
            <span>Taxes and fees</span>
          </li>
        </ul>
      </div>

      <SaveAndExport />
    </section>
  );
};

export default EstimatedRange;
