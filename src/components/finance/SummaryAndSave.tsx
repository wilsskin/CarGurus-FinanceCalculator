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
      <h3>Finance Summary</h3>

      {/* Amount to Finance - Three columns + Finance Amount row */}
      <div className="bg-white/50 rounded-cg-lg border border-border overflow-hidden">
        <div className="px-4 py-4">
          {/* Three columns: Car Total | Down Payment | Trade-In */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-body-sm font-medium text-foreground">Car Subtotal</span>
              <span className="text-[14px] font-medium text-foreground tabular-nums">{formatCurrency(carSubtotal)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-body-sm font-medium text-muted-foreground">Down Payment</span>
              <span className="text-body-sm text-muted-foreground tabular-nums">− {formatCurrency(loanDetails.downPayment)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-body-sm font-medium text-muted-foreground">Trade-In</span>
              <span className="text-body-sm text-muted-foreground tabular-nums">− {formatCurrency(tradeIn.netValue)}</span>
            </div>
          </div>

          {/* Finance Amount row - label left, amount right + loan term & APR */}
          <div className="flex flex-col gap-1 pt-4 mt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-body-sm font-medium text-foreground">Amount to Finance</span>
              <span className="text-body-sm font-medium text-foreground tabular-nums">{formatCurrency(amountFinanced)}</span>
            </div>
            <span className="text-body-sm text-muted-foreground">
              {[
                loanDetails.termMonths > 0 && `${loanDetails.termMonths} mo`,
                loanDetails.interestRate != null && loanDetails.interestRate > 0 && `${loanDetails.interestRate}% APR`
              ].filter(Boolean).join(' · ') || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Interest Charge, Loan Cost + Monthly Payment/Total Cost */}
      <div className="rounded-cg-lg border border-border overflow-hidden">
        <div className="divide-y divide-border bg-white/50">
          <div className="flex flex-col gap-1 px-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-body-sm font-medium text-foreground">Interest Charge</span>
              <span className="text-body-sm font-medium text-foreground">
                {noLoanDetailsProvided ? '—' : formatCurrency(financeCharge)}
              </span>
            </div>
            <span className="text-body-sm text-muted-foreground">Finance amount x term x APR</span>
          </div>

          <div className="flex justify-between items-center px-4 py-4">
            <span className="text-body-sm font-medium text-foreground">Loan Cost</span>
            <span className="text-body-sm font-medium text-foreground">
              {noLoanDetailsProvided ? '—' : formatCurrency(loanCost)}
            </span>
          </div>
        </div>

        {/* Monthly Payment + Total Cost - White to draw focus */}
        <div className="bg-background px-4 py-5 border-t border-border">
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-body-lg font-medium text-foreground">Monthly Payment</span>
            <span className="text-price-md font-bold text-foreground">
              {noLoanDetailsProvided ? '—' : formatCurrency(monthlyPayment)}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-body-lg font-medium text-foreground">Total Cost</span>
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
