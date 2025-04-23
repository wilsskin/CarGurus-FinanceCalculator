import React, { useState } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { ChevronDown } from 'lucide-react';

const CarCost: React.FC = () => {
  const { state } = useFinance();
  const [isTaxesOpen, setIsTaxesOpen] = useState(false);
  
  const subtotal = state.carPrice + 
    (state.addonsTotal || 0) - 
    (state.discounts || 0) + 
    state.taxesAndFees.taxAmount + 
    state.taxesAndFees.totalFees;

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-[#1EAEDB] mb-8">Car Cost</h2>
      
      {/* Base Price & Add-ons */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-sm font-semibold text-gray-700">Base Price</span>
          <span className="font-medium">{formatCurrency(state.carPrice)}</span>
        </div>
        
        {state.addonsTotal > 0 && (
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-gray-700">Add-ons & Packages</span>
            <span className="font-medium">+{formatCurrency(state.addonsTotal)}</span>
          </div>
        )}
        
        {state.discounts > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="text-sm font-semibold">Discounts</span>
            <span className="font-medium">-{formatCurrency(state.discounts)}</span>
          </div>
        )}
      </div>
      
      {/* Taxes & Fees Dropdown */}
      <div className="border rounded-lg mb-6">
        <button
          onClick={() => setIsTaxesOpen(!isTaxesOpen)}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-700">Taxes & Fees</span>
          <div className="flex items-center">
            <span className="mr-2 text-[#1EAEDB] font-medium">
              {formatCurrency(state.taxesAndFees.taxAmount + state.taxesAndFees.totalFees)}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isTaxesOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>
        
        {isTaxesOpen && (
          <div className="p-4 border-t space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Sales Tax ({state.taxesAndFees.taxRate}%)</span>
              <span className="font-medium">{formatCurrency(state.taxesAndFees.taxAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Registration Fee</span>
              <span className="font-medium">{formatCurrency(state.taxesAndFees.registrationFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Documentation Fee</span>
              <span className="font-medium">{formatCurrency(state.taxesAndFees.documentFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Other Fees</span>
              <span className="font-medium">{formatCurrency(state.taxesAndFees.otherFees)}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Pre-financing Subtotal */}
      <div className="flex justify-between pt-4 border-t">
        <span className="text-lg font-bold text-gray-900">Subtotal</span>
        <span className="text-xl font-bold text-[#1EAEDB]">{formatCurrency(subtotal)}</span>
      </div>
    </section>
  );
};

export default CarCost;
