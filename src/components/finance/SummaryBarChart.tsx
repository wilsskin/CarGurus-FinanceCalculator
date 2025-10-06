
import React from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { Card } from '../ui/card';

const SimpleBarChart: React.FC = () => {
  const { state } = useFinance();
  const { loanDetails, tradeIn, taxesAndFees, carPrice, monthlyPayment, totalCost, addonsTotal, discounts, paymentType } = state;
  
  // Calculate components for the stacked bar
  const components = [
    { 
      label: 'Vehicle Price', 
      value: carPrice, 
      color: '#0578BB',  // Primary blue
      isNegative: false 
    },
    { 
      label: 'Add-ons', 
      value: addonsTotal, 
      color: '#33C3F0',  // Light blue
      isNegative: false,
      show: addonsTotal > 0
    },
    { 
      label: 'Taxes & Fees', 
      value: taxesAndFees.taxAmount + taxesAndFees.totalFees, 
      color: '#555555',  // Dark gray
      isNegative: false 
    },
    { 
      label: 'Interest', 
      value: paymentType !== 'cash' ? (monthlyPayment * loanDetails.termMonths) - (carPrice - loanDetails.downPayment - tradeIn.netValue) : 0,
      color: '#888888',  // Medium gray
      isNegative: false,
      show: paymentType !== 'cash'
    },
    { 
      label: 'Discounts', 
      value: -discounts, 
      color: '#ea384c',  // Red for negative values
      isNegative: true,
      show: discounts > 0
    },
    { 
      label: 'Trade-in', 
      value: -tradeIn.netValue, 
      color: '#C8C8C9',  // Light gray for trade-in
      isNegative: true,
      show: tradeIn.netValue > 0
    }
  ].filter(component => component.show !== false && component.value !== 0);

  // Make sure we have a visible chart even if there's only one component
  const maxValue = Math.max(
    components.reduce((sum, component) => sum + Math.abs(component.value), 0),
    1  // Ensure we don't divide by zero
  );

  // Ensure the chart is visible even when there are no components
  if (components.length === 0) {
    components.push({
      label: 'Vehicle Price',
      value: carPrice,
      color: '#0578BB',
      isNegative: false
    });
  }

  return (
    <Card className="p-4 bg-[#F7F8FB] border-[#E6E8EB] mb-4">
      <div className="space-y-4">
        <div className="h-12 flex rounded-lg overflow-hidden border border-gray-200">
          {components.map((component, index) => (
            <div
              key={component.label}
              style={{
                width: `${(Math.abs(component.value) / maxValue) * 100}%`,
                backgroundColor: component.color,
                transition: 'width 0.3s ease-in-out',
                minWidth: '10px' // Ensure each segment is at least somewhat visible
              }}
              className="h-full relative group cursor-pointer"
            >
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap z-10 transition-opacity border border-gray-100">
                <div className="font-medium text-gray-800">{component.label}</div>
                <div className="text-[#0578BB] font-bold">
                  {formatCurrency(Math.abs(component.value))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center text-xs">
          {components.map((component, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div 
                className="w-4 h-4 rounded-sm" 
                style={{ backgroundColor: component.color }}
              />
              <span className="text-[#222] font-medium">
                {component.label} {component.isNegative ? '(-)' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SimpleBarChart;

