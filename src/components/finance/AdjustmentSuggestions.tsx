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
    const value = parseFloat(event.target.value) || 0;
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: {
        monthlyPaymentGoal: value
      }
    });
  };
  const suggestions = [];
  if (paymentGoal && monthlyPayment > paymentGoal) {
    // Calculate how much more down payment would be needed
    const additionalDownPaymentNeeded = (monthlyPayment - paymentGoal) * loanDetails.termMonths;
    const suggestedDownPayment = loanDetails.downPayment + additionalDownPaymentNeeded;
    suggestions.push({
      text: `Increase your down payment to ${formatCurrency(suggestedDownPayment)} to reach your monthly payment goal`,
      action: 'downPayment'
    });

    // Suggest longer term if possible
    if (loanDetails.termMonths < 84) {
      suggestions.push({
        text: `Consider a longer loan term to lower your monthly payments`,
        action: 'termMonths'
      });
    }

    // Suggest lower priced vehicle
    const suggestedPrice = carPrice - additionalDownPaymentNeeded;
    suggestions.push({
      text: `Look for vehicles around ${formatCurrency(suggestedPrice)} to meet your monthly payment goal`,
      action: 'carPrice'
    });
  } else {
    // Always show some helpful suggestions
    suggestions.push({
      text: `Increase your down payment to ${formatCurrency(loanDetails.downPayment + 2000)}`,
      action: 'downPayment'
    });

    // Suggest term adjustment if not at max
    if (loanDetails.termMonths < 84) {
      const suggestedTerm = Math.min(84, loanDetails.termMonths + 12);
      suggestions.push({
        text: `Extend your loan term to ${suggestedTerm / 12} years`,
        action: 'termMonths'
      });
    }

    // Suggest price adjustment
    const suggestedPrice = carPrice - 2000;
    suggestions.push({
      text: `Look for vehicles around ${formatCurrency(suggestedPrice)}`,
      action: 'carPrice'
    });
  }
  return <Card className="p-4 bg-[#F7F8FB] border-[#E6E8EB] mt-4">
      <p className="font-medium text-[#1EAEDB] mb-2">🎯 Monthly Payment Goal</p>
      <div className="space-y-3 mb-3">
        <label className="text-sm font-semibold text-gray-700">
          Monthly Payment Goal
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <Input type="number" value={loanDetails.monthlyPaymentGoal || ''} onChange={handlePaymentGoalChange} className="pl-8" placeholder="Enter target monthly payment" />
        </div>
      </div>
      {paymentGoal && monthlyPayment > paymentGoal && <p className="text-sm text-[#222] mb-2">
          To reach your goal of {formatCurrency(paymentGoal)}/month (current: {formatCurrency(monthlyPayment)}/month):
        </p>}
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => <li key={index} className="text-sm text-[#222] flex items-center gap-2">
            <span className="text-[#1EAEDB]">•</span>
            {suggestion.text}
          </li>)}
      </ul>
    </Card>;
};
export default AdjustmentSuggestions;