
import React from 'react';
import { useFinance } from '../../context/FinanceContext';

const SimpleBarChart: React.FC = () => {
  const { state } = useFinance();
  const { loanDetails, tradeIn, taxesAndFees, carPrice, monthlyPayment, totalCost, paymentType } = state;
  // Build breakdown for car gurus: Principal, Interest, Fees/Taxes, less Trade-In
  // Only break down if not cash
  const principal = carPrice - loanDetails.downPayment - tradeIn.netValue;
  const interest = paymentType !== 'cash'
    ? (monthlyPayment * loanDetails.termMonths - principal)
    : 0;
  const taxesFees = taxesAndFees.taxAmount + taxesAndFees.totalFees;
  const trade = tradeIn.netValue;

  const data = [
    { label: 'Principal', value: Math.max(principal, 0), color: '#1EAEDB' },
    { label: 'Interest', value: paymentType !== 'cash' ? Math.max(interest, 0) : 0, color: '#9b87f5' },
    { label: 'Taxes/Fees', value: taxesFees, color: '#8E9196' },
    { label: 'Trade-In', value: -trade, color: '#C8C8C9' }
  ];

  const total = data.reduce((sum, d) => sum + Math.abs(d.value), 0) || 1;
  return (
    <div className="w-full h-12 flex flex-col">
      <div className="w-full flex h-4 rounded overflow-hidden">
        {data.map(d => d.value !== 0 && (
          <div
            key={d.label}
            style={{
              width: `${Math.abs(d.value) / total * 100}%`,
              background: d.color
            }}
            className="h-full"
            title={d.label}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-[#8E9196] px-1">
        {data.map(d => d.value !== 0 && (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
};

export default SimpleBarChart;
