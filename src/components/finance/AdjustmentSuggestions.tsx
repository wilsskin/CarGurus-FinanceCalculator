
import React from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { Card } from '../ui/card';
import { Input } from '../ui/input';

const AdjustmentSuggestions: React.FC = () => {
  const {
    state,
    dispatch
  } = useFinance();
  const {
    carPrice,
    loanDetails,
    monthlyPayment
  } = state;
  const paymentGoal = loanDetails.monthlyPaymentGoal;

  const handlePaymentGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    const numVal = raw === '' ? undefined : parseFloat(raw);
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: {
        monthlyPaymentGoal: numVal === undefined || isNaN(numVal) ? undefined : numVal
      }
    });
  };

  const suggestions = [];
  if (paymentGoal && monthlyPayment > paymentGoal) {
    // Calculate how much more down payment would be needed
    const additionalDownPaymentNeeded = (monthlyPayment - paymentGoal) * loanDetails.termMonths;
    const suggestedDownPayment = loanDetails.downPayment + additionalDownPaymentNeeded;
    suggestions.push({
      text: `Increase your down payment to ${formatCurrency(suggestedDownPayment)}`,
      action: 'downPayment'
    });

    // Suggest longer term if possible
    if (loanDetails.termMonths < 84) {
      suggestions.push({
        text: `Consider a longer loan term`,
      });
    }

    // Suggest lower priced vehicle
    const suggestedPrice = carPrice - additionalDownPaymentNeeded;
    suggestions.push({
      text: `Look for vehicles around ${formatCurrency(suggestedPrice)}`,
      action: 'carPrice'
    });
  }
  const goalAchieved = paymentGoal && monthlyPayment <= paymentGoal;

  return <Card className="p-4 bg-muted border-border mt-4">
      <p className="font-medium text-foreground mb-2">🎯 Monthly Payment Goal</p>
      <div className="space-y-4">
        <div className="relative h-10">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input type="number" value={loanDetails.monthlyPaymentGoal ?? ''} onChange={handlePaymentGoalChange} className="pl-8 h-full placeholder:text-sm placeholder:font-light placeholder:text-muted-foreground" placeholder="Enter target monthly payment" />
        </div>
        <div className="pt-4">
          {goalAchieved ? (
            <p className="text-sm font-medium text-foreground">You hit your monthly goal!</p>
          ) : (
            <label className={paymentGoal ? "text-sm font-medium text-foreground" : "text-sm font-normal text-muted-foreground"}>
              {!paymentGoal ? 
                "Enter a target monthly payment to review suggestions" : 
                "Suggestions to meet your goal"}
            </label>
          )}
        </div>
      </div>
      {paymentGoal && monthlyPayment > paymentGoal && <p className="text-sm font-medium text-muted-foreground mb-2">
        Current: {formatCurrency(monthlyPayment)}/month
        </p>}
      {!goalAchieved && (
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-muted-foreground">•</span>
              {suggestion.text}
            </li>)}
        </ul>
      )}
    </Card>;
};

export default AdjustmentSuggestions;
