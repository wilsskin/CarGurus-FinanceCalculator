import React, { useState } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';

const CarCost: React.FC = () => {
  const { state, dispatch } = useFinance();
  const [showTradeIn, setShowTradeIn] = useState(false);
  const [editingTaxes, setEditingTaxes] = useState(false);
  const [showCustomFee, setShowCustomFee] = useState(false);

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

  const handleTaxRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taxRate = parseFloat(event.target.value) || 0;
    const taxAmount = (state.carPrice * taxRate) / 100;
    dispatch({
      type: 'SET_TAXES_AND_FEES',
      payload: { taxRate, taxAmount }
    });
  };

  const handleFeeChange = (fee: keyof typeof state.taxesAndFees, value: string) => {
    const numValue = parseFloat(value) || 0;
    dispatch({
      type: 'SET_TAXES_AND_FEES',
      payload: { [fee]: numValue }
    });
  };

  const handleCustomFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFeeChange('otherFees', event.target.value);
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
        
        {/* Taxes & Fees Section - With Inline Editing */}
        <div className="space-y-2 border-l-2 border-[#1EAEDB] pl-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Taxes & Fees</span>
            <button 
              onClick={() => setEditingTaxes(!editingTaxes)} 
              className="p-1.5 rounded-full hover:bg-[#E9F6FB] transition-colors"
              aria-label="Edit taxes and fees"
            >
              <Pencil className="w-4 h-4 text-[#1EAEDB]" />
            </button>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Sales Tax Rate ({state.taxesAndFees.taxRate}%)</span>
            {editingTaxes ? (
              <div className="relative w-24">
                <Input
                  type="number"
                  value={state.taxesAndFees.taxRate}
                  onChange={handleTaxRateChange}
                  className="h-8 px-2 text-right"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            ) : (
              <span className="font-medium text-[#1EAEDB]">{formatCurrency(state.taxesAndFees.taxAmount)}</span>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Registration Fee</span>
            {editingTaxes ? (
              <div className="relative w-24">
                <Input
                  type="number"
                  value={state.taxesAndFees.registrationFee}
                  onChange={(e) => handleFeeChange('registrationFee', e.target.value)}
                  className="h-8 px-2 text-right"
                  min="0"
                />
              </div>
            ) : (
              <span className="font-medium text-[#1EAEDB]">{formatCurrency(state.taxesAndFees.registrationFee)}</span>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Documentation Fee</span>
            {editingTaxes ? (
              <div className="relative w-24">
                <Input
                  type="number"
                  value={state.taxesAndFees.documentFee}
                  onChange={(e) => handleFeeChange('documentFee', e.target.value)}
                  className="h-8 px-2 text-right"
                  min="0"
                />
              </div>
            ) : (
              <span className="font-medium text-[#1EAEDB]">{formatCurrency(state.taxesAndFees.documentFee)}</span>
            )}
          </div>
        </div>

        {/* Custom Fee Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-700">Additional Fee</span>
            <button 
              onClick={() => setShowCustomFee(!showCustomFee)} 
              className="text-sm font-medium text-[#1EAEDB]"
            >
              {showCustomFee ? 'Remove' : 'Add Fee'}
            </button>
          </div>
          
          {showCustomFee && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Label>Fee Amount</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    type="number"
                    value={state.taxesAndFees.otherFees}
                    onChange={handleCustomFeeChange}
                    className="pl-7"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

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
