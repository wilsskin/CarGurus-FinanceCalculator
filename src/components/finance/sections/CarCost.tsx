import React, { useState } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/layout';

const CarCost: React.FC = () => {
  const { state, dispatch } = useFinance();
  const [showTradeIn, setShowTradeIn] = useState(false);
  const [editingTaxes, setEditingTaxes] = useState(false);
  const [showAdditionalFee, setShowAdditionalFee] = useState(false);

  const handleTradeInValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    dispatch({ type: 'SET_TRADE_IN', payload: { value } });
  };

  const handleOwedAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const owedAmount = parseFloat(event.target.value) || 0;
    dispatch({ type: 'SET_TRADE_IN', payload: { owedAmount } });
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

  const handleAdditionalFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFeeChange('otherFees', event.target.value);
  };

  const handleAddFeeClick = () => {
    setShowAdditionalFee(true);
  };

  const handleRemoveAdditionalFee = () => {
    setShowAdditionalFee(false);
    dispatch({ type: 'SET_TAXES_AND_FEES', payload: { otherFees: 0 } });
  };

  const calculateCarCostTotal = () => {
    return state.carPrice + state.taxesAndFees.taxAmount + state.taxesAndFees.totalFees;
  };

  const taxesAndFees = state.taxesAndFees;
  const showAdditionalFeeInput = showAdditionalFee || taxesAndFees.otherFees > 0;
  const taxFeeLineItems = [
    { label: `Sales Tax (${taxesAndFees.taxRate}%)`, value: taxesAndFees.taxAmount },
    { label: 'Registration Fee', value: taxesAndFees.registrationFee },
    { label: 'Documentation Fee', value: taxesAndFees.documentFee },
    { label: 'Dealer Fee', value: taxesAndFees.dealerFee },
    ...(taxesAndFees.otherFees > 0 ? [{ label: 'Additional Fee', value: taxesAndFees.otherFees }] : []),
  ];

  return (
    <section className="space-y-5">
      <h3>Car Cost</h3>
      
      <div className="space-y-4">
        {/* Base Price */}
        <div className="flex justify-between items-center pt-0 pb-3 border-b border-border text-body">
          <span className="font-medium text-foreground">Base Price</span>
          <span className="font-medium text-foreground">{formatCurrency(state.carPrice)}</span>
        </div>
        
        {/* Taxes & Fees - Receipt style default, Edit reveals form */}
        <div className="py-3 border-b border-border">
          {editingTaxes ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-body font-bold text-muted-foreground">Taxes & Fees</span>
                <button
                  onClick={() => setEditingTaxes(false)}
                  className="text-body font-semibold text-primary"
                >
                  Done
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-body text-muted-foreground">Sales Tax (%)</span>
                  <div className="relative w-28">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                    <Input 
                      type="number" 
                      value={taxesAndFees.taxRate} 
                      onChange={handleTaxRateChange} 
                      className="h-10 pl-7 pr-3 text-right text-sm" 
                      min="0" 
                      max="100" 
                      step="0.1" 
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-body text-muted-foreground">Registration Fee</span>
                  <div className="relative w-28">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <Input 
                      type="number" 
                      value={taxesAndFees.registrationFee} 
                      onChange={e => handleFeeChange('registrationFee', e.target.value)} 
                      className="h-10 pl-7 pr-3 text-right text-sm" 
                      min="0" 
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-body text-muted-foreground">Documentation Fee</span>
                  <div className="relative w-28">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <Input 
                      type="number" 
                      value={taxesAndFees.documentFee} 
                      onChange={e => handleFeeChange('documentFee', e.target.value)} 
                      className="h-10 pl-7 pr-3 text-right text-sm" 
                      min="0" 
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-body text-muted-foreground">Dealer Fee</span>
                  <div className="relative w-28">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <Input 
                      type="number" 
                      value={taxesAndFees.dealerFee} 
                      onChange={e => handleFeeChange('dealerFee', e.target.value)} 
                      className="h-10 pl-7 pr-3 text-right text-sm" 
                      min="0" 
                    />
                  </div>
                </div>

                {showAdditionalFeeInput && (
                  <div className="flex justify-between items-center animate-fade-in">
                    <span className="text-body-sm text-muted-foreground">Additional Fee</span>
                    <div className="flex items-center gap-2">
                      <div className="relative w-28">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                        <Input 
                          type="number" 
                          value={taxesAndFees.otherFees || ''} 
                          onChange={handleAdditionalFeeChange} 
                          className="h-10 pl-7 pr-3 text-right text-sm" 
                          min="0" 
                          placeholder="0"
                        />
                      </div>
                      <button
                        onClick={handleRemoveAdditionalFee}
                        className="text-body font-semibold text-primary"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {!showAdditionalFeeInput && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddFeeClick}
                      className="text-body font-semibold text-primary"
                    >
                      Add Fee
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-body font-bold text-muted-foreground">Taxes and Fees</span>
                <button
                  onClick={() => setEditingTaxes(true)}
                  className="text-body font-semibold text-primary"
                >
                  Edit
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {taxFeeLineItems.map(item => (
                  <div key={item.label} className="flex justify-between text-body">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-muted-foreground font-normal">{formatCurrency(item.value)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-body">
                  <span className="font-medium text-foreground">Estimated Tax</span>
                  <span className="font-medium text-foreground">{formatCurrency(taxesAndFees.taxAmount + taxesAndFees.totalFees)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Car Subtotal - Receipt style, above Trade-In */}
        <div className="flex justify-between items-center py-3 border-b border-border">
          <span className="text-body-lg font-medium text-foreground">Car Subtotal</span>
          <span id="subtotal-amount" className="text-price-md text-foreground font-bold">
            {formatCurrency(calculateCarCostTotal())}
          </span>
        </div>

        {/* Trade-In Section */}
        <div className="pt-1 pb-3">
          <div className="flex justify-end">
            <button 
              onClick={() => setShowTradeIn(!showTradeIn)} 
              className="text-body font-semibold text-primary"
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
      </div>
    </section>
  );
};

export default CarCost;
