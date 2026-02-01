import React, { useState } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { Input } from '@/components/ui/input';
import { Pencil, ChevronDown, ChevronUp } from 'lucide-react';
import { FieldGroup, FieldLabel } from '@/components/layout';

const CarCost: React.FC = () => {
  const { state, dispatch } = useFinance();
  const [showTradeIn, setShowTradeIn] = useState(false);
  const [editingTaxes, setEditingTaxes] = useState(false);
  const [showCustomFee, setShowCustomFee] = useState(false);

  const handleTradeInValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    dispatch({ type: 'SET_TRADE_IN', payload: { value } });
  };

  const handleOwedAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const owedAmount = parseFloat(event.target.value) || 0;
    dispatch({ type: 'SET_TRADE_IN', payload: { owedAmount } });
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value) || 0);
    dispatch({ type: 'UPDATE_DISCOUNTS', payload: value });
  };

  const handleTaxRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taxRate = parseFloat(event.target.value) || 0;
    const taxAmount = state.carPrice * taxRate / 100;
    dispatch({ type: 'SET_TAXES_AND_FEES', payload: { taxRate, taxAmount } });
  };

  const handleFeeChange = (fee: keyof typeof state.taxesAndFees, value: string) => {
    const numValue = parseFloat(value) || 0;
    dispatch({ type: 'SET_TAXES_AND_FEES', payload: { [fee]: numValue } });
  };

  const handleCustomFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFeeChange('otherFees', event.target.value);
  };

  const calculateSubtotal = () => {
    return state.carPrice + (state.addonsTotal || 0) + state.taxesAndFees.taxAmount + state.taxesAndFees.totalFees - (state.discounts || 0) - state.tradeIn.netValue;
  };

  return (
    <section className="space-y-5">
      <h2>Car Cost</h2>
      
      <div className="space-y-4">
        {/* Base Price */}
        <div className="flex justify-between items-center py-3 border-b border-border">
          <span className="text-label font-medium text-foreground">Base Price</span>
          <span className="text-price-sm text-foreground">{formatCurrency(state.carPrice)}</span>
        </div>
        
        {/* Selected Add-ons List */}
        {Object.values(state.selectedAddons).length > 0 && (
          <div className="py-3 border-b border-border">
            <div className="text-label font-medium text-foreground mb-3">Selected Add-ons</div>
            <div className="space-y-2">
              {Object.values(state.selectedAddons).map(addon => (
                <div key={addon.id} className="flex justify-between text-body-sm">
                  <span className="text-muted-foreground">{addon.name}</span>
                  <span className="font-medium text-foreground">{formatCurrency(addon.price)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Taxes & Fees Section */}
        <div className="py-3 border-b border-border">
          <button 
            onClick={() => setEditingTaxes(!editingTaxes)} 
            className="flex justify-between items-center w-full text-left"
          >
            <span className="text-label font-medium text-foreground">Taxes & Fees</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">
                {formatCurrency(state.taxesAndFees.taxAmount + state.taxesAndFees.totalFees)}
              </span>
              {editingTaxes ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </button>
          
          {editingTaxes && (
            <div className="mt-4 space-y-3 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-body-sm text-muted-foreground">Sales Tax ({state.taxesAndFees.taxRate}%)</span>
                <div className="relative w-28">
                  <Input 
                    type="number" 
                    value={state.taxesAndFees.taxRate} 
                    onChange={handleTaxRateChange} 
                    className="h-10 px-3 text-right text-sm" 
                    min="0" 
                    max="100" 
                    step="0.1" 
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-body-sm text-muted-foreground">Registration Fee</span>
                <div className="relative w-28">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input 
                    type="number" 
                    value={state.taxesAndFees.registrationFee} 
                    onChange={e => handleFeeChange('registrationFee', e.target.value)} 
                    className="h-10 pl-7 pr-3 text-right text-sm" 
                    min="0" 
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-body-sm text-muted-foreground">Documentation Fee</span>
                <div className="relative w-28">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input 
                    type="number" 
                    value={state.taxesAndFees.documentFee} 
                    onChange={e => handleFeeChange('documentFee', e.target.value)} 
                    className="h-10 pl-7 pr-3 text-right text-sm" 
                    min="0" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Custom Fee Section */}
        <div className="py-3 border-b border-border">
          <div className="flex justify-between items-center">
            <span className="text-label font-medium text-foreground">Additional Fee</span>
            <button 
              onClick={() => setShowCustomFee(!showCustomFee)} 
              className="text-body-sm font-semibold text-primary"
            >
              {showCustomFee ? 'Remove' : 'Add Fee'}
            </button>
          </div>
          
          {showCustomFee && (
            <div className="mt-4 animate-fade-in">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                <Input 
                  type="number" 
                  value={state.taxesAndFees.otherFees || ''} 
                  onChange={handleCustomFeeChange} 
                  className="pl-8" 
                  placeholder="0" 
                  min="0" 
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Dealer Discount */}
        <div className="py-3 border-b border-border">
          <FieldGroup>
            <FieldLabel>Dealer Discount</FieldLabel>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
              <Input 
                type="number" 
                value={state.discounts || ''} 
                onChange={handleDiscountChange} 
                className="pl-8" 
                placeholder="0" 
              />
            </div>
          </FieldGroup>
        </div>

        {/* Trade-In Section */}
        <div className="py-3">
          <div className="flex justify-between items-center">
            <span className="text-label font-medium text-foreground">Trade-In Value</span>
            <button 
              onClick={() => setShowTradeIn(!showTradeIn)} 
              className="text-body-sm font-semibold text-primary"
            >
              {showTradeIn ? 'Remove' : 'Add Trade-In'}
            </button>
          </div>
          
          {showTradeIn && (
            <div className="mt-4 space-y-4 animate-fade-in">
              <FieldGroup>
                <FieldLabel>Vehicle Value</FieldLabel>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                  <Input 
                    type="number" 
                    value={state.tradeIn.value || ''} 
                    onChange={handleTradeInValueChange} 
                    className="pl-8" 
                    placeholder="0" 
                  />
                </div>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Amount Owed (Optional)</FieldLabel>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                  <Input 
                    type="number" 
                    value={state.tradeIn.owedAmount || ''} 
                    onChange={handleOwedAmountChange} 
                    className="pl-8" 
                    placeholder="0" 
                  />
                </div>
              </FieldGroup>
              
              {(state.tradeIn.value > 0 || state.tradeIn.owedAmount > 0) && (
                <div className={`p-4 rounded-cg text-body-sm ${
                  state.tradeIn.netValue > 0 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {state.tradeIn.netValue > 0 ? (
                    <>
                      <div className="font-semibold">
                        {formatCurrency(state.tradeIn.netValue)} in positive equity
                      </div>
                      <div className="mt-1 opacity-80">This amount will be applied to your purchase.</div>
                    </>
                  ) : (
                    <>
                      <div className="font-semibold">
                        {formatCurrency(Math.abs(state.tradeIn.netValue))} in negative equity
                      </div>
                      <div className="mt-1 opacity-80">This amount may be added to your new loan.</div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Subtotal */}
        <div className="flex justify-between items-center pt-5 border-t-2 border-foreground/20">
          <span className="text-lg font-bold text-foreground">Car Subtotal</span>
          <span id="subtotal-amount" className="text-price-md text-primary">
            {formatCurrency(calculateSubtotal())}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CarCost;