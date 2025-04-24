import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { animateValue } from '@/utils/animateValue';

const CarCost: React.FC = () => {
  const { state, dispatch } = useFinance();
  const [isTaxesOpen, setIsTaxesOpen] = useState(false);
  const [isAddonsOpen, setIsAddonsOpen] = useState(false);
  const [prevTotal, setPrevTotal] = useState(0);
  
  const subtotal = state.carPrice + 
    (state.addonsTotal || 0) - 
    (state.discounts || 0) + 
    state.taxesAndFees.taxAmount + 
    state.taxesAndFees.totalFees;

  useEffect(() => {
    if (prevTotal !== subtotal) {
      const element = document.getElementById('subtotal-amount');
      animateValue(element);
      setPrevTotal(subtotal);
    }
  }, [subtotal, prevTotal]);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value) || 0);
    dispatch({ type: 'UPDATE_DISCOUNTS', payload: value });
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-[#1EAEDB] mb-8">Car Cost</h2>
      
      <div className="space-y-6 mb-6">
        <div className="flex justify-between">
          <span className="text-sm font-semibold text-gray-700">Base Price</span>
          <span className="font-medium">{formatCurrency(state.carPrice)}</span>
        </div>
        
        {state.addonsTotal > 0 && (
          <div className="border-l-2 border-[#1EAEDB] pl-4 py-2 space-y-3 bg-[#F7F8FB] rounded-r-lg">
            <button
              onClick={() => setIsAddonsOpen(!isAddonsOpen)}
              className="w-full flex justify-between items-center"
            >
              <div>
                <span className="text-sm font-semibold text-gray-700">Selected Add-ons</span>
                <span className="ml-2 text-xs text-[#1EAEDB] font-medium">({Object.values(state.selectedAddons || {}).length} items)</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-[#1EAEDB] mr-2">+{formatCurrency(state.addonsTotal)}</span>
                <ChevronDown className={`w-4 h-4 text-[#1EAEDB] transition-transform ${isAddonsOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {isAddonsOpen && (
              <div className="pt-2 space-y-2 border-t border-[#E6E8EB] mt-2">
                {Object.entries(state.selectedAddons || {}).map(([id, addon]) => (
                  <div key={id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{addon.name}</span>
                    <span className="font-medium text-[#1EAEDB]">{formatCurrency(addon.price)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {state.discounts > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="text-sm font-semibold">Dealer Discount</span>
            <span className="font-medium">-{formatCurrency(state.discounts)}</span>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="discount" className="text-sm font-semibold text-gray-700">
            Add Dealer Discount
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
      
      <div className="flex justify-between pt-4 border-t">
        <span className="text-lg font-bold text-gray-900">Subtotal</span>
        <span id="subtotal-amount" className="text-xl font-bold text-[#1EAEDB] transition-all">
          {formatCurrency(subtotal)}
        </span>
      </div>
    </section>
  );
};

export default CarCost;
