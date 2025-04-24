
import React from 'react';
import { useFinance } from '@/context/finance';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/financeCalculator';

const CostBreakdownChart: React.FC = () => {
  const { state } = useFinance();
  const { carPrice, loanDetails, tradeIn, taxesAndFees, addonsTotal, discounts, paymentType } = state;

  // Calculate the finance charge (total interest)
  const financeCharge = paymentType !== 'cash' 
    ? (loanDetails.termMonths * state.monthlyPayment) - 
      (carPrice + addonsTotal - discounts + taxesAndFees.taxAmount + taxesAndFees.totalFees - loanDetails.downPayment - tradeIn.netValue)
    : 0;

  const data = [
    {
      name: 'Vehicle Price',
      amount: carPrice,
      fill: '#1EAEDB'
    },
    {
      name: 'Add-ons',
      amount: addonsTotal,
      fill: '#9b87f5'
    },
    {
      name: 'Taxes & Fees',
      amount: taxesAndFees.taxAmount + taxesAndFees.totalFees,
      fill: '#8E9196'
    },
    {
      name: 'Interest',
      amount: financeCharge,
      fill: '#C8C8C9',
      display: paymentType !== 'cash'
    },
    {
      name: 'Discounts',
      amount: -discounts,
      fill: '#33C3F0'
    },
    {
      name: 'Trade-in',
      amount: -tradeIn.netValue,
      fill: '#0FA0CE'
    }
  ].filter(item => item.amount !== 0 && (item.display !== false));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded-lg border">
          <p className="text-sm font-medium text-gray-700">{payload[0].payload.name}</p>
          <p className="text-sm font-bold text-[#1EAEDB]">
            {formatCurrency(Math.abs(payload[0].value))}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[200px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          barSize={32}
        >
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(Math.abs(value))}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostBreakdownChart;
