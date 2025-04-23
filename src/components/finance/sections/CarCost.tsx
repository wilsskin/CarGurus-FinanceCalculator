import React, { useState } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CarCost: React.FC = () => {
  const { state, dispatch } = useFinance();
  const [isTaxesOpen, setIsTaxesOpen] = useState(false);
  
  const subtotal = state.carPrice + 
    (state.addonsTotal || 0) - 
    (state.discounts || 0) + 
    state.taxesAndFees.taxAmount + 
    state.taxesAndFees.totalFees;

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value) || 0);
    dispatch({ type: 'UPDATE_DISCOUNTS', payload: value });
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-[#1EAEDB] mb-8">Car Cost</h2>
      
      {/* Base Price & Add-ons */}
      <div className="space-y-6 mb-6">
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
        
        {/* Dealer Discount Field */}
        <div className="space-y-2">
          <Label htmlFor="discount" className="text-sm font-semibold text-gray-700">
            Dealer Discount
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <Input
              id="discount"
              type="number"
              value={state.discounts || ''}
              onChange={handleDiscountChange}
              className="pl-7"
              placeholder="0"
              min="0"
            />
          </div>
          <p className="text-sm text-[#8E9196]">Any negotiated discount or dealership incentives.</p>
        </div>
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
