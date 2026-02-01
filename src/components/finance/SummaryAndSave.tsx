import React, { useState } from 'react';
import { useFinance } from '../../context/finance';
import { formatCurrency } from '../../utils/financeCalculator';
import TipCard from './TipCard';
import { Info, Clock } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '@/components/ui/sonner';

const SummaryAndSave: React.FC = () => {
  const { state, dispatch } = useFinance();
  const {
    carPrice,
    paymentType,
    loanDetails,
    tradeIn,
    taxesAndFees,
    addonsTotal,
    discounts,
    monthlyPayment,
    totalCost
  } = state;
  const [isEditingAPR, setIsEditingAPR] = useState(false);

  // Calculate the amount financed properly
  const amountFinanced = carPrice + (addonsTotal || 0) - (discounts || 0) + taxesAndFees.taxAmount + taxesAndFees.totalFees - loanDetails.downPayment - tradeIn.netValue;

  // Finance charge is the total cost of the loan minus the amount financed
  const financeCharge = loanDetails.termMonths && loanDetails.interestRate ? monthlyPayment * loanDetails.termMonths - amountFinanced : 0;
  const totalLoanCost = loanDetails.termMonths && loanDetails.interestRate ? monthlyPayment * loanDetails.termMonths : amountFinanced;

  const handleAPRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { interestRate: isNaN(value) ? 0 : value }
    });
  };

  const noLoanDetailsProvided = !loanDetails.termMonths || !loanDetails.interestRate || loanDetails.interestRate === 0;

  if (paymentType === 'cash') {
    return (
      <section className="space-y-5">
        <h2>Purchase Summary</h2>
        <div className="bg-background rounded-cg-lg border border-border p-5">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">Total Cost</span>
            <span className="text-price-md text-primary">{formatCurrency(totalCost)}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <h2>Finance Summary</h2>
      
      {/* APR Input */}
      <div>
        <label className="block text-label font-medium text-foreground mb-2">
          APR (Interest Rate)
        </label>
        {isEditingAPR ? (
          <div className="relative">
            <Input 
              type="number" 
              value={loanDetails.interestRate || ''} 
              onChange={handleAPRChange} 
              onBlur={() => setIsEditingAPR(false)} 
              className="pr-8" 
              placeholder="Enter APR" 
              step="0.1"
              autoFocus
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%</span>
          </div>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => setIsEditingAPR(true)} 
            className="w-full text-left justify-start"
          >
            {loanDetails.interestRate ? `${loanDetails.interestRate}%` : 'Set APR'}
          </Button>
        )}
      </div>

      {/* Loan Term Summary */}
      {loanDetails.termMonths > 0 && (
        <div className="flex items-center gap-2 py-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-body-sm text-muted-foreground">
            {loanDetails.termMonths} month loan term
          </span>
        </div>
      )}

      {/* Payment Details - Receipt Style */}
      <div className="bg-background rounded-cg-lg border border-border overflow-hidden">
        {/* Line Items */}
        <div className="divide-y divide-border">
          <div className="flex justify-between items-center px-4 py-4">
            <span className="text-body-sm text-muted-foreground">Amount Financed</span>
            <span className="text-body-sm font-medium text-foreground">{formatCurrency(amountFinanced)}</span>
          </div>

          <div className="flex justify-between items-center px-4 py-4">
            <span className="text-body-sm text-muted-foreground">Interest Charge</span>
            <span className="text-body-sm font-medium text-foreground">
              {noLoanDetailsProvided ? '—' : formatCurrency(financeCharge)}
            </span>
          </div>

          <div className="flex justify-between items-center px-4 py-4">
            <span className="text-body-sm text-muted-foreground">Total Loan Cost</span>
            <span className="text-body-sm font-medium text-foreground">
              {noLoanDetailsProvided ? formatCurrency(amountFinanced) : formatCurrency(totalLoanCost)}
            </span>
          </div>

          <div className="flex justify-between items-center px-4 py-4">
            <span className="text-body-sm text-muted-foreground">Down Payment</span>
            <span className="text-body-sm font-medium text-foreground">{formatCurrency(loanDetails.downPayment)}</span>
          </div>

          {tradeIn.netValue > 0 && (
            <div className="flex justify-between items-center px-4 py-4">
              <span className="text-body-sm text-muted-foreground">Trade-In Value</span>
              <span className="text-body-sm font-medium text-green-600">{formatCurrency(tradeIn.netValue)}</span>
            </div>
          )}
        </div>

        {/* Monthly Payment - Large Display */}
        <div className="bg-section-light px-4 py-5 border-t-2 border-foreground/10">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-label font-bold text-foreground">Monthly Payment</span>
            <span className="text-price-lg text-foreground">
              {noLoanDetailsProvided ? '—' : formatCurrency(monthlyPayment)}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-label font-bold text-foreground">Total Cost</span>
            <span className="text-price-md text-primary">
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Tip */}
      {noLoanDetailsProvided && (
        <TipCard 
          tipText="To calculate your monthly payment, please complete your loan details: term, down payment, and APR." 
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