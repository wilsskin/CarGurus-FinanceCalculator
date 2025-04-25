
import React from 'react';
import { useFinance } from '@/context/finance';
import { Info } from 'lucide-react';
import { formatCurrency } from '@/utils/financeCalculator';

const EstimatedRange: React.FC = () => {
  const { state } = useFinance();
  
  // Calculate range: base estimate ±5% for variation
  const baseEstimate = state.totalCost;
  const minEstimate = Math.floor(baseEstimate * 0.95);
  const maxEstimate = Math.ceil(baseEstimate * 1.05);
  
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <h3 className="text-sm font-semibold text-gray-700">Estimated Cost Range</h3>
        <Info className="w-4 h-4 text-[#8E9196] mt-0.5" />
      </div>
      
      <div className="text-xl font-bold text-[#1EAEDB]">
        {formatCurrency(minEstimate)} – {formatCurrency(maxEstimate)}
      </div>
      
      <div className="space-y-2 text-sm text-[#8E9196]">
        <p>This range may vary based on:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Final interest rate approval</li>
          <li>Available dealer incentives</li>
          <li>Selected add-ons and packages</li>
        </ul>
      </div>
    </div>
  );
};

export default EstimatedRange;
