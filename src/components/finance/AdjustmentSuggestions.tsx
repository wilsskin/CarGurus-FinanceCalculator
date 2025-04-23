
import React from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { Card } from '../ui/card';

const AdjustmentSuggestions: React.FC = () => {
  const { state } = useFinance();
  const { lockedField, lockedValue, carPrice, loanDetails } = state;

  if (!lockedField || lockedValue === null) return null;

  const suggestions = [];
  
  if (lockedField === 'monthlyPayment') {
    // Suggest down payment adjustment
    const suggestedDownPayment = loanDetails.downPayment + 2000;
    suggestions.push({
      text: `Increase your down payment to ${formatCurrency(suggestedDownPayment)}`,
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

  if (lockedField === 'totalCost') {
    // Similar suggestions for total cost...
    const suggestedDownPayment = loanDetails.downPayment + 3000;
    suggestions.push({
      text: `Increase your down payment to ${formatCurrency(suggestedDownPayment)}`,
      action: 'downPayment'
    });
  }

  return (
    <Card className="p-4 bg-[#F7F8FB] border-[#E6E8EB] mt-4">
      <p className="font-medium text-[#1EAEDB] mb-2">
        🎯 You've locked {lockedField === 'monthlyPayment' ? 'monthly payment' : 'total cost'} at {formatCurrency(lockedValue)}
      </p>
      <p className="text-sm text-[#222] mb-2">To hit this target, try:</p>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="text-sm text-[#222] flex items-center gap-2">
            <span className="text-[#1EAEDB]">•</span>
            {suggestion.text}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default AdjustmentSuggestions;
