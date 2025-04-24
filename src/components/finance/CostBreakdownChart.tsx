
import React from 'react';
import { useFinance } from '@/context/finance';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '@/utils/financeCalculator';

const CostBreakdownChart: React.FC = () => {
  const { state } = useFinance();
  const { carPrice, loanDetails, tradeIn, taxesAndFees, addonsTotal, discounts, paymentType } = state;

  // Calculate the finance charge (total interest)
  const financeCharge = paymentType !== 'cash' 
    ? (loanDetails.termMonths * state.monthlyPayment) - 
      (carPrice + addonsTotal - discounts + taxesAndFees.taxAmount + taxesAndFees.totalFees - loanDetails.downPayment - tradeIn.netValue)
    : 0;

  // Total cost calculation
  const totalCost = carPrice + addonsTotal + taxesAndFees.taxAmount + taxesAndFees.totalFees + financeCharge - discounts - tradeIn.netValue;

  const costComponents = [
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
          <p className="text-sm font-bold" style={{ color: payload[0].payload.fill }}>
            {formatCurrency(Math.abs(payload[0].value))}
          </p>
        </div>
      );
    }
    return null;
  };

  const data = [{ total: totalCost }];

  return (
    <div className="w-full h-[200px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <XAxis 
            dataKey="total"
            tickFormatter={() => 'Total Cost'}
            interval={0}
            tick={{ fontSize: 14, fontWeight: 'bold' }}
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(Math.abs(value))}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total" width={50}>
            {costComponents.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-2 space-x-2">
        {costComponents.map((component, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-4 h-4 mr-1" 
              style={{ backgroundColor: component.fill }}
            />
            <span className="text-xs text-gray-600">{component.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostBreakdownChart;
