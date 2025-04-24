
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

  // Use full cost value for data to make the bar visible
  const data = costComponents.map(component => ({
    name: component.name,
    value: Math.abs(component.amount),
    fill: component.fill,
    isNegative: component.amount < 0
  }));

  return (
    <div className="w-full h-[150px] mt-4 mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="horizontal"
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          stackOffset="sign"
          barGap={0}
          barCategoryGap={0}
        >
          <XAxis 
            type="number"
            domain={[0, 'dataMax']}
            tickFormatter={(value) => formatCurrency(value)}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            type="category"
            dataKey="name"
            width={100}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            barSize={30}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill} 
                stroke={entry.fill}
                strokeWidth={1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4 space-x-2 flex-wrap">
        {costComponents.map((component, index) => (
          <div key={index} className="flex items-center mr-2 mb-1">
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
