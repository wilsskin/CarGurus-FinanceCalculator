import React, { useState } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const CarCost: React.FC = () => {
  const {
    state,
    dispatch
  } = useFinance();
  const [isTaxesOpen, setIsTaxesOpen] = useState(false);
  const [showTradeIn, setShowTradeIn] = useState(false);
  const handleTradeInValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    dispatch({
      type: 'SET_TRADE_IN',
      payload: {
        value
      }
    });
  };
  const handleOwedAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const owedAmount = parseFloat(event.target.value) || 0;
    dispatch({
      type: 'SET_TRADE_IN',
      payload: {
        owedAmount
      }
    });
  };
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value) || 0);
    dispatch({
      type: 'UPDATE_DISCOUNTS',
      payload: value
    });
  };
  const handleTaxesToggle = () => {
    setIsTaxesOpen(!isTaxesOpen);
  };
  return <section className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-extrabold mb-6 text-[#1EAEDB]">Car Cost</h2>
      
      <div className="space-y-6">
        {/* Base Price */}
        <div className="flex justify-between">
          <span className="text-sm font-semibold text-gray-700">Base Price</span>
          <span className="font-medium">{formatCurrency(state.carPrice)}</span>
        </div>
        
        {/* Selected Add-ons List */}
        {Object.values(state.selectedAddons).length > 0 && <div className="space-y-2 border-l-2 border-[#1EAEDB] pl-4">
            <span className="text-sm font-semibold text-gray-700">Selected Add-ons</span>
            {Object.values(state.selectedAddons).map(addon => <div key={addon.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{addon.name}</span>
                <span className="font-medium text-[#1EAEDB]">{formatCurrency(addon.price)}</span>
              </div>)}
          </div>}
        
        {/* Trade-In Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-700">Trade-In Value</span>
            <button onClick={() => setShowTradeIn(!showTradeIn)} className="text-sm font-medium text-[#1EAEDB]">
              {showTradeIn ? 'Remove' : 'Add Trade-In'}
            </button>
          </div>
          
          {showTradeIn && <div className="space-y-4 animate-fade-in">
              <div>
                <Label>Vehicle Value</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input type="number" value={state.tradeIn.value} onChange={e => dispatch({
                type: 'SET_TRADE_IN',
                payload: {
                  value: parseFloat(e.target.value) || 0
                }
              })} className="pl-7" placeholder="0" />
                </div>
              </div>
              
              <div>
                <Label>Amount Owed (Optional)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input type="number" value={state.tradeIn.owedAmount} onChange={e => dispatch({
                type: 'SET_TRADE_IN',
                payload: {
                  owedAmount: parseFloat(e.target.value) || 0
                }
              })} className="pl-7" placeholder="0" />
                </div>
              </div>
              
              {(state.tradeIn.value > 0 || state.tradeIn.owedAmount > 0) && <div className={`
                  p-3 rounded-md text-sm
                  ${state.tradeIn.netValue > 0 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}
                `}>
                  {state.tradeIn.netValue > 0 ? <>
                      <div className="font-medium">
                        {formatCurrency(state.tradeIn.netValue)} in positive equity
                      </div>
                      <div>This amount will be applied to your purchase.</div>
                    </> : <>
                      <div className="font-medium">
                        {formatCurrency(Math.abs(state.tradeIn.netValue))} in negative equity
                      </div>
                      <div>This amount may be added to your new loan.</div>
                    </>}
                </div>}
            </div>}
        </div>
        
        {/* Taxes & Fees Section */}
        <div className="border rounded-lg">
          <button onClick={handleTaxesToggle} className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-700">Taxes & Fees</span>
            <div className="flex items-center">
              <span className="mr-2 text-[#1EAEDB] font-medium">
                {formatCurrency(state.taxesAndFees.taxAmount + state.taxesAndFees.totalFees)}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isTaxesOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>
          
          {isTaxesOpen && <div className="p-4 border-t space-y-3">
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
            </div>}
        </div>
        
        {/* Dealer Discount */}
        <div className="space-y-2">
          <Label>Dealer Discount</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <Input type="number" value={state.discounts || ''} onChange={e => dispatch({
            type: 'UPDATE_DISCOUNTS',
            payload: parseFloat(e.target.value) || 0
          })} className="pl-7" placeholder="0" />
          </div>
          
        </div>
        
        {/* Subtotal */}
        <div className="flex justify-between pt-4 border-t">
          <span className="text-lg font-bold text-gray-900">Subtotal</span>
          <span id="subtotal-amount" className="text-xl font-bold text-[#1EAEDB]">
            {formatCurrency(state.totalCost)}
          </span>
        </div>
      </div>
    </section>;
};
export default CarCost;