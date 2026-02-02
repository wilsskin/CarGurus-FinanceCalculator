import React from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '../../utils/financeCalculator';
import TipCard from './TipCard';

const SummaryAndSave: React.FC = () => {
  const { state } = useFinance();
  const {
    carPrice,
    loanDetails,
    tradeIn,
    taxesAndFees,
    monthlyPayment,
    totalCost
  } = state;

  const carSubtotal = carPrice + taxesAndFees.taxAmount + taxesAndFees.totalFees;
  const amountFinanced = carSubtotal - loanDetails.downPayment - tradeIn.netValue;

  const financeCharge = loanDetails.termMonths && loanDetails.interestRate
    ? monthlyPayment * loanDetails.termMonths - amountFinanced
    : 0;
  const loanCost = loanDetails.termMonths && loanDetails.interestRate
    ? monthlyPayment * loanDetails.termMonths
    : amountFinanced;

  const noLoanDetailsProvided = !loanDetails.termMonths || !loanDetails.interestRate || loanDetails.interestRate === 0;

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2">
        <h3>Finance Summary</h3>
        {loanDetails.termMonths > 0 && (
          <span className="text-body-sm text-muted-foreground">
            {loanDetails.termMonths}-month loan term
          </span>
        )}
      </div>

      {/* Amount to Finance - Two-column layout: price column + label column */}
      <div className="space-y-2 text-body-sm">
        <div className="flex items-center gap-3">
          <span className="min-w-[5.5rem] text-right font-medium text-foreground">{formatCurrency(carSubtotal)}</span>
          <span className="font-medium text-foreground">Car Subtotal</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="min-w-[5.5rem] text-right font-medium text-foreground">− {formatCurrency(loanDetails.downPayment)}</span>
          <span className="text-muted-foreground">Down Payment</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="min-w-[5.5rem] text-right font-medium text-foreground">− {formatCurrency(tradeIn.netValue)}</span>
          <span className="text-muted-foreground">Trade-In</span>
        </div>
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <span className="min-w-[5.5rem] text-right font-bold text-foreground text-body">{formatCurrency(amountFinanced)}</span>
          <span className="font-bold text-foreground text-body">Amount to Finance</span>
        </div>
      </div>

      {/* White Card - Finance Amount, Interest, Loan Cost */}
      <div className="bg-background rounded-cg-lg border border-border overflow-hidden">
        <div className="divide-y divide-border">
          <div className="flex justify-between items-center px-4 py-4">
            <span className="text-body-sm font-medium text-foreground">Finance Amount</span>
            <span className="text-body-sm font-medium text-foreground">{formatCurrency(amountFinanced)}</span>
          </div>

          <div className="flex justify-between items-center px-4 py-4">
            <div>
              <span className="text-body-sm font-medium text-foreground">Interest Charge </span>
              <span className="text-caption text-muted-foreground">(APR × term × finance amount)</span>
            </div>
            <span className="text-body-sm font-medium text-foreground">
              {noLoanDetailsProvided ? '—' : formatCurrency(financeCharge)}
            </span>
          </div>

          <div className="flex justify-between items-center px-4 py-4">
            <span className="text-body-sm font-medium text-foreground">Loan Cost</span>
            <span className="text-body-sm font-medium text-foreground">
              {noLoanDetailsProvided ? '—' : formatCurrency(loanCost)}
            </span>
          </div>
        </div>

        {/* Monthly Payment + Total Cost - Same style, both black */}
        <div className="bg-section-light px-4 py-5 border-t border-border">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-label font-bold text-foreground">Monthly Payment</span>
            <span className="text-price-md font-bold text-foreground">
              {noLoanDetailsProvided ? '—' : formatCurrency(monthlyPayment)}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-label font-bold text-foreground">Total Cost</span>
            <span className="text-price-md font-bold text-foreground">
              {noLoanDetailsProvided ? '—' : formatCurrency(totalCost)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Tip */}
      {noLoanDetailsProvided && (
        <TipCard 
          tipText="To calculate your monthly payment, please complete your loan details: term, down payment, and APR above." 
          tipType="info" 
          dismissible={false} 
        />
      )}
      {!noLoanDetailsProvided && monthlyPayment > 500 && (
        <TipCard 
          tipText="Want a lower monthly payment? Try increasing your down payment or extending your loan term." 
          tipType="info" 
          dismissible={false} 
        />
      )}
    </section>
  );
};

export default SummaryAndSave;
