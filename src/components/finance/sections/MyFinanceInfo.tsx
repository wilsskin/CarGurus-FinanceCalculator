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

  // Don't render this section if payment type is cash
  if (state.paymentType === 'cash') {
    return null;
  }

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

  return (
    <section className="space-y-5">
      <h2>My Finance Info</h2>
      
      <div className="space-y-5">
        {/* Credit Score - Segmented Control */}
        <FieldGroup>
          <FieldLabel>Credit Score</FieldLabel>
          <SegmentedControl 
            value={state.creditScore?.toString() || ''} 
            onValueChange={handleCreditScoreChange}
          >
            {creditScoreRanges.map(range => (
              <SegmentedControlItem key={range.value} value={range.value}>
                <div className="flex flex-col items-center leading-tight">
                  <span className="text-sm font-semibold">{range.label}</span>
                  <span className="text-xs opacity-80">{range.range}</span>
                </div>
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </FieldGroup>
        
        {/* Loan Term - Segmented Control */}
        <FieldGroup>
          <FieldLabel>Loan Term</FieldLabel>
          <SegmentedControl 
            value={state.loanDetails.termMonths?.toString() || ''} 
            onValueChange={handleLoanTermChange}
          >
            {loanTermOptions.map(term => (
              <SegmentedControlItem key={term.months} value={term.months.toString()}>
                <div className="flex flex-col items-center leading-tight">
                  <span className="text-sm font-semibold">{term.label}</span>
                  <span className="text-xs opacity-80">{term.months} mo</span>
                </div>
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </FieldGroup>
        
        {/* Down Payment - Input Field */}
        <FieldGroup>
          <FieldLabel>Down Payment</FieldLabel>
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
            <FieldHelper>
              {Math.round(state.loanDetails.downPayment / state.carPrice * 100)}% of vehicle price
            </FieldHelper>
          )}
        </FieldGroup>
      </div>
      
      <AdjustmentSuggestions />
    </section>
  );
};

export default MyFinanceInfo;
