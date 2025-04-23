import React, { useState } from 'react';
import { useFinance } from '../../context/finance';
import { formatCurrency } from '../../utils/financeCalculator';
import TipCard from './TipCard';
import { Info } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import LockButton from './LockButton';

const SummaryAndSave: React.FC = () => {
  const { state, dispatch } = useFinance();
  
  const handleLockToggle = (field: LockableField, value: number) => {
    if (state.lockedField === field) {
      dispatch({ type: 'LOCK_FIELD', payload: null });
    } else {
      dispatch({ type: 'LOCK_FIELD', payload: { field, value } });
    }
  };

  const [isExpanded, setIsExpanded] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [isEditingAPR, setIsEditingAPR] = useState(false);

  const amountFinanced = carPrice + (addonsTotal || 0) - (discounts || 0) + 
    taxesAndFees.taxAmount + taxesAndFees.totalFees - 
    loanDetails.downPayment - tradeIn.netValue;

  const financeCharge = (monthlyPayment * loanDetails.termMonths) - amountFinanced;

  const totalLoanCost = monthlyPayment * loanDetails.termMonths;

  const handleAPRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { interestRate: isNaN(value) ? 0 : value }
    });
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (paymentType === 'cash') {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-28 animate-slide-in font-sans">
        <h2 className="text-xl font-extrabold mb-4 text-[#1EAEDB]">Purchase Summary</h2>
        <div className="border rounded-lg p-4 bg-[#F7F8FB] space-y-4">
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-[#222]">Total Cost</span>
            <span className="font-extrabold text-[#1EAEDB]">{formatCurrency(totalCost)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-28 animate-slide-in font-sans">
      <h2 className="text-xl font-extrabold mb-4 text-[#1EAEDB]">Finance Summary</h2>
      
      {/* APR Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#222] mb-2">
          APR (Interest Rate)
        </label>
        {isEditingAPR ? (
          <Input
            type="number"
            value={loanDetails.interestRate || ''}
            onChange={handleAPRChange}
            onBlur={() => setIsEditingAPR(false)}
            className="max-w-[200px]"
            placeholder="Enter APR"
            step="0.1"
          />
        ) : (
          <Button
            variant="outline"
            onClick={() => setIsEditingAPR(true)}
            className="text-left justify-start hover:bg-[#F7F8FB]"
          >
            {loanDetails.interestRate ? `${loanDetails.interestRate}%` : 'Click to set APR'}
          </Button>
        )}
        <p className="text-sm text-[#8E9196] mt-1">Ask your lender or use a rough estimate.</p>
      </div>

      {/* Receipt Block */}
      <div className={cn(
        "border rounded-lg overflow-hidden transition-all duration-300",
        isExpanded ? "h-auto" : "h-24"
      )}>
        {/* Header/Toggle */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex justify-between items-center bg-[#F7F8FB] hover:bg-gray-100 transition-colors"
        >
          <span className="font-semibold text-[#222]">Payment Details</span>
          <span className="text-[#1EAEDB]">{isExpanded ? 'Hide' : 'Show'}</span>
        </button>

        {/* Receipt Content */}
        <div className="p-4 space-y-4">
          {/* Amount Financed */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Amount Financed</span>
              <Info className="h-4 w-4 text-[#8E9196]" />
            </div>
            <span className="font-medium">{formatCurrency(amountFinanced)}</span>
          </div>
          <p className="text-sm text-[#8E9196] -mt-2">What you're borrowing after down payment and trade-in.</p>

          {/* Finance Charge */}
          <div className="flex justify-between items-start pt-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Finance Charge</span>
              <Info className="h-4 w-4 text-[#8E9196]" />
            </div>
            <span className="font-medium">{formatCurrency(financeCharge)}</span>
          </div>
          <p className="text-sm text-[#8E9196] -mt-2">This is the cost of borrowing the money.</p>

          {/* Total Loan Cost */}
          <div className="flex justify-between items-start pt-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Total Loan Cost</span>
              <Info className="h-4 w-4 text-[#8E9196]" />
            </div>
            <span className="font-medium">{formatCurrency(totalLoanCost)}</span>
          </div>
          <p className="text-sm text-[#8E9196] -mt-2">What you'll repay over the life of your loan.</p>
        </div>

        {/* Highlighted Values with Lock Buttons */}
        <div className="border-t p-4 bg-[#F7F8FB] space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-[#222]">Monthly Payment</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-[#1EAEDB]">
                {formatCurrency(monthlyPayment)}
              </span>
              <LockButton
                isLocked={state.lockedField === 'monthlyPayment'}
                onToggle={() => handleLockToggle('monthlyPayment', monthlyPayment)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold text-[#222]">Total Cost</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-[#1EAEDB]">
                {formatCurrency(totalCost)}
              </span>
              <LockButton
                isLocked={state.lockedField === 'totalCost'}
                onToggle={() => handleLockToggle('totalCost', totalCost)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Tip */}
      {monthlyPayment > 500 && (
        <div className="mt-6">
          <TipCard 
            tipText="💡 Want a lower monthly payment? Try increasing your down payment or extending your loan term."
            tipType="info"
            dismissible={false}
          />
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-0 right-0 mx-auto w-4/5 max-w-sm bg-[#1EAEDB] text-white p-3 rounded-lg shadow-lg animate-fade-in flex items-center justify-center z-50">
          <span className="font-bold">Estimate saved!</span>
        </div>
      )}
    </div>
  );
};

export default SummaryAndSave;
