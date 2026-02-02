import React from 'react';
import { useFinance } from '@/context/finance';
import { Input } from "@/components/ui/input";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import AdjustmentSuggestions from '../AdjustmentSuggestions';
import { FieldGroup, FieldLabel, FieldHelper } from '@/components/layout';

const creditScoreRanges = [
  { label: 'Excellent', range: '720+', value: '720' },
  { label: 'Good', range: '690-719', value: '690' },
  { label: 'Fair', range: '630-689', value: '630' },
  { label: 'Poor', range: '<630', value: '629' }
];

const loanTermOptions = [
  { months: 36, label: '3 yr' },
  { months: 48, label: '4 yr' },
  { months: 60, label: '5 yr' },
  { months: 72, label: '6 yr' },
  { months: 84, label: '7 yr' }
];

const MyFinanceInfo: React.FC = () => {
  const { state, dispatch } = useFinance();

  const handleCreditScoreChange = (value: string) => {
    dispatch({
      type: 'SET_CREDIT_SCORE',
      payload: parseInt(value)
    });
  };

  const handleLoanTermChange = (value: string) => {
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { termMonths: parseInt(value) }
    });
  };

  const handleDownPaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { downPayment: value }
    });
  };

  const handleAPRChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { interestRate: isNaN(value) ? 0 : value }
    });
  };

  return (
    <section className="space-y-5">
      <h3>My Finance Info</h3>
      
      <div className="space-y-4">
        {/* Credit Score - Segmented Control */}
        <FieldGroup className="space-y-1">
          <FieldLabel className="text-field-tag text-foreground">Credit Score</FieldLabel>
          <SegmentedControl 
            value={state.creditScore?.toString() || ''} 
            onValueChange={handleCreditScoreChange}
          >
            {creditScoreRanges.map(range => (
              <SegmentedControlItem key={range.value} value={range.value}>
                <div className="flex flex-col items-center leading-tight text-caption">
                  <span className="font-semibold">{range.label}</span>
                  <span className="opacity-80">{range.range}</span>
                </div>
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </FieldGroup>
        
        {/* Loan Term - Segmented Control */}
        <FieldGroup className="space-y-1">
          <FieldLabel className="text-field-tag text-foreground">Loan Term</FieldLabel>
          <SegmentedControl 
            value={state.loanDetails.termMonths?.toString() || ''} 
            onValueChange={handleLoanTermChange}
          >
            {loanTermOptions.map(term => (
              <SegmentedControlItem key={term.months} value={term.months.toString()}>
                <div className="flex flex-col items-center leading-tight text-caption">
                  <span className="font-semibold">{term.label}</span>
                  <span className="opacity-80">{term.months} mo</span>
                </div>
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </FieldGroup>
        
        {/* Down Payment - Input Field */}
        <FieldGroup className="space-y-1">
          <FieldLabel className="text-field-tag text-foreground">Down Payment</FieldLabel>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
            <Input 
              type="number" 
              value={state.loanDetails.downPayment || ''} 
              onChange={handleDownPaymentChange} 
              className="pl-8" 
              placeholder="0" 
            />
          </div>
          {state.loanDetails.downPayment > 0 && state.carPrice > 0 && (
            <FieldHelper className="text-[12px] font-normal opacity-80 text-muted-foreground">
              {Math.round(state.loanDetails.downPayment / state.carPrice * 100)}% of vehicle price
            </FieldHelper>
          )}
        </FieldGroup>

        {/* APR - Input Field */}
        <FieldGroup className="space-y-1">
          <FieldLabel className="text-field-tag text-foreground">APR (Interest Rate)</FieldLabel>
          <div className="relative">
            <Input 
              type="number" 
              value={state.loanDetails.interestRate || ''} 
              onChange={handleAPRChange} 
              className="pr-8" 
              placeholder="6.7" 
              step="0.1"
              min="0"
              max="25"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%</span>
          </div>
            <FieldHelper className="text-[12px] font-normal opacity-80 text-muted-foreground">Based on credit score and current rates</FieldHelper>
        </FieldGroup>
      </div>
      
      <AdjustmentSuggestions />
    </section>
  );
};

export default MyFinanceInfo;
