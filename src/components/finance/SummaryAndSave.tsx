
import React, { useState } from 'react';
import { useFinance } from '../../context/finance';
import { formatCurrency } from '../../utils/financeCalculator';
import TipCard from './TipCard';
import { Info, Clock, PiggyBank, WalletIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
const SummaryAndSave: React.FC = () => {
  const {
    state,
    dispatch
  } = useFinance();
  const {
    carPrice,
    paymentType,
    loanDetails,
    tradeIn,
    taxesAndFees,
    addonsTotal,
    discounts,
    monthlyPayment,
    totalCost
  } = state;
  const [isEditingAPR, setIsEditingAPR] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Calculate the amount financed properly (verify calculation)
  const amountFinanced = carPrice + (addonsTotal || 0) - (discounts || 0) + taxesAndFees.taxAmount + taxesAndFees.totalFees - loanDetails.downPayment - tradeIn.netValue;

  // Finance charge is the total cost of the loan minus the amount financed
  const financeCharge = loanDetails.termMonths && loanDetails.interestRate ? monthlyPayment * loanDetails.termMonths - amountFinanced : 0;
  const totalLoanCost = loanDetails.termMonths && loanDetails.interestRate ? monthlyPayment * loanDetails.termMonths : amountFinanced;
  const handleAPRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: {
        interestRate: isNaN(value) ? 0 : value
      }
    });
  };
  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const noLoanDetailsProvided = !loanDetails.termMonths || !loanDetails.interestRate || loanDetails.interestRate === 0;
  if (paymentType === 'cash') {
    return <div className="bg-white rounded-xl shadow-md p-6 mb-28 animate-slide-in font-sans">
        <h2 className="text-xl font-extrabold mb-4 text-[#1EAEDB]">Purchase Summary</h2>
        <div className="border rounded-lg p-4 bg-[#F7F8FB] space-y-4">
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-[#222]">Total Cost</span>
            <span className="font-extrabold text-[#1EAEDB]">{formatCurrency(totalCost)}</span>
          </div>
        </div>
      </div>;
  }
  return <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-slide-in font-sans">
      <h2 className="text-xl font-extrabold mb-4 text-[#1EAEDB]">Finance Summary</h2>
      
      {/* APR Input - Full width white box */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#222] mb-2">
          APR (Interest Rate)
        </label>
        {isEditingAPR ? <Input type="number" value={loanDetails.interestRate || ''} onChange={handleAPRChange} onBlur={() => setIsEditingAPR(false)} className="w-full" placeholder="Enter APR" step="0.1" /> : <Button variant="outline" onClick={() => setIsEditingAPR(true)} className="w-full text-left justify-start hover:bg-[#F7F8FB]">
            {loanDetails.interestRate ? `${loanDetails.interestRate}%` : 'Set APR'}
          </Button>}
      </div>

      {/* Loan Term & Trade-in Summary */}
      <div className="mb-6">
        {loanDetails.termMonths > 0 && <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-[#8E9196]" />
            <span className="text-sm text-[#222]">
              {loanDetails.termMonths} month loan term
            </span>
          </div>}
        {tradeIn.netValue > 0 && <div className="flex items-center gap-2">
            <PiggyBank className="w-4 h-4 text-[#8E9196]" />
            <span className="text-sm text-[#222]">
              Trade-in value: {formatCurrency(tradeIn.netValue)}
            </span>
          </div>}
      </div>

      {/* Payment Details Box */}
      <div className="border rounded-lg p-4 space-y-4 mb-4">
        {/* Amount Financed */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Amount Financed</span>
            <Info className="h-4 w-4 text-[#8E9196]" />
          </div>
          <span className="font-medium">{formatCurrency(amountFinanced)}</span>
        </div>

        {/* Finance Charge */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Interest Charge</span>
            <Info className="h-4 w-4 text-[#8E9196]" />
          </div>
          <span className="font-medium">{noLoanDetailsProvided ? 'N/A' : formatCurrency(financeCharge)}</span>
        </div>

        {/* Total Loan Cost */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Total Loan Cost</span>
            <Info className="h-4 w-4 text-[#8E9196]" />
          </div>
          <span className="font-medium">{noLoanDetailsProvided ? formatCurrency(amountFinanced) : formatCurrency(totalLoanCost)}</span>
        </div>

        {/* Down Payment */}
        <div className="flex justify-between items-start pt-2 border-t">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Down Payment</span>
            <Info className="h-4 w-4 text-[#8E9196]" />
          </div>
          <span className="font-medium">{formatCurrency(loanDetails.downPayment)}</span>
        </div>

        {/* Trade-In Value - Only display if user has input a trade-in */}
        {tradeIn.netValue > 0 && (
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Trade-In Value</span>
              <Info className="h-4 w-4 text-[#8E9196]" />
            </div>
            <span className="font-medium">{formatCurrency(tradeIn.netValue)}</span>
          </div>
        )}

        {/* Monthly Payment and Total Cost */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-[#222]">Monthly Payment</span>
            <span className="text-xl font-extrabold text-[#1EAEDB]">
              {noLoanDetailsProvided ? 'Fill loan details' : formatCurrency(monthlyPayment)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-[#222]">Total Cost</span>
            <span className="text-xl font-extrabold text-[#1EAEDB]">
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Tip */}
      {noLoanDetailsProvided && <TipCard tipText="💡 To calculate your monthly payment, please complete your loan details: term, down payment, and APR." tipType="info" dismissible={false} />}
      {!noLoanDetailsProvided && monthlyPayment > 500 && <TipCard tipText="💡 Want a lower monthly payment? Try increasing your down payment or extending your loan term." tipType="info" dismissible={false} />}

      {/* Toast */}
      {showToast && <div className="fixed bottom-24 left-0 right-0 mx-auto w-4/5 max-w-sm bg-[#1EAEDB] text-white p-3 rounded-lg shadow-lg animate-fade-in flex items-center justify-center z-50">
          <span className="font-bold">Estimate saved!</span>
        </div>}
    </div>;
};
export default SummaryAndSave;
