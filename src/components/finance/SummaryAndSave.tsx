

import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';
import TipCard from './TipCard';
import { Download, Save } from 'lucide-react';
import ChartBreakdown from './SummaryBarChart';

const SummaryAndSave: React.FC = () => {
  const { state } = useFinance();
  const {
    carPrice,
    paymentType,
    loanDetails,
    tradeIn,
    taxesAndFees,
    monthlyPayment,
    totalCost
  } = state;

  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-28 animate-slide-in font-sans">
      <h2 className="text-xl font-extrabold mb-4 text-[#1EAEDB]">Summary &amp; Save</h2>

      <div className="space-y-4">
        {/* Vehicle information */}
        <div className="pb-3 border-b border-[#E6E8EB]">
          <h3 className="text-sm text-[#8E9196] mb-2 font-semibold">Vehicle Information</h3>
          <div className="text-lg font-semibold">{formatCurrency(carPrice)}</div>
        </div>

        {/* Payment info */}
        <div className="pb-3 border-b border-[#E6E8EB]">
          <h3 className="text-sm text-[#8E9196] mb-2 font-semibold">Payment Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-[#222]">Payment Type</div>
              <div className="font-semibold">
                {paymentType === 'dealer'
                  ? 'Dealer Financing'
                  : paymentType === 'outside'
                    ? 'Outside Loan'
                    : 'Cash'}
              </div>
            </div>
            {paymentType !== 'cash' && (
              <>
                <div className="flex justify-between">
                  <div className="text-[#222]">Down Payment</div>
                  <div className="font-semibold">{formatCurrency(loanDetails.downPayment)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#222]">Loan Term</div>
                  <div className="font-semibold">{loanDetails.termMonths} months</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#222]">Interest Rate</div>
                  <div className="font-semibold">{loanDetails.interestRate || '-'}%</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#222]">Monthly Payment</div>
                  <div className="font-semibold">{formatCurrency(monthlyPayment)}</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Trade-in */}
        {tradeIn.value > 0 && (
          <div className="pb-3 border-b border-[#E6E8EB]">
            <h3 className="text-sm text-[#8E9196] mb-2 font-semibold">Trade-In</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-[#222]">Vehicle Value</div>
                <div className="font-semibold">{formatCurrency(tradeIn.value)}</div>
              </div>
              {tradeIn.owedAmount > 0 && (
                <div className="flex justify-between">
                  <div className="text-[#222]">Amount Owed</div>
                  <div className="font-semibold">{formatCurrency(tradeIn.owedAmount)}</div>
                </div>
              )}
              <div className="flex justify-between">
                <div className="text-[#222]">Net Trade-In Value</div>
                <div className="font-semibold">{formatCurrency(tradeIn.netValue)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Taxes and fees */}
        <div className="pb-3 border-b border-[#E6E8EB]">
          <h3 className="text-sm text-[#8E9196] mb-2 font-semibold">Taxes & Fees</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-[#222]">Sales Tax ({taxesAndFees.taxRate}%)</div>
              <div className="font-semibold">{formatCurrency(taxesAndFees.taxAmount)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-[#222]">Registration & Other Fees</div>
              <div className="font-semibold">{formatCurrency(taxesAndFees.totalFees)}</div>
            </div>
          </div>
        </div>

        {/* Total cost */}
        <div className="pt-2">
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold text-[#222]">Total Cost</div>
            <div className="text-xl font-extrabold text-[#1EAEDB]">{formatCurrency(totalCost)}</div>
          </div>
        </div>
      </div>

      {/* Negotiation tip */}
      {paymentType !== 'cash' && (
        <div className="mt-6">
          <TipCard
            tipText="This estimate can help you negotiate. Interest rate can be negotiable at the dealership."
            tipType="success"
            dismissible={false}
          />
        </div>
      )}

      {/* Sticky dual CTA bar (save/download) - always visible at bottom, CarGurus style */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-xl py-3 px-5 flex gap-3 max-w-md mx-auto">
        <button
          onClick={handleSave}
          className="w-1/2 py-3 flex justify-center items-center font-bold bg-[#1EAEDB] text-white rounded-xl hover:bg-[#137a9b] transition-all"
        >
          <Download className="w-5 h-5 mr-2" />
          Download
        </button>
        <button
          onClick={handleSave}
          className="w-1/2 py-3 flex justify-center items-center border-2 border-[#1EAEDB] rounded-xl bg-white text-[#1EAEDB] font-bold hover:bg-[#E9F6FB] transition-all"
        >
          <Save className="w-5 h-5 mr-2" />
          Save
        </button>
      </div>

      {/* Real-time simple bar chart breakdown at bottom */}
      <div className="mt-8">
        <ChartBreakdown />
      </div>

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
