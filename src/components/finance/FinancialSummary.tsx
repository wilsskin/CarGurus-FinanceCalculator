
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';
import { Card, CardContent } from '../ui/card';
import { Clock, PiggyBank, WalletIcon } from 'lucide-react';

const FinancialSummary: React.FC = () => {
  const { state } = useFinance();
  const { paymentType, loanDetails, tradeIn, monthlyPayment, totalCost } = state;

  if (paymentType === 'cash') {
    return null;
  }

  return (
    <div className="max-w-md mx-auto px-4 -mt-2 mb-6">
      <Card className="bg-[#F7F8FB] border-none">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Loan Term */}
            <div className="flex flex-col items-center p-3 bg-white rounded-lg">
              <Clock className="w-5 h-5 text-[#1EAEDB] mb-1" />
              <span className="text-xs text-gray-500">Term</span>
              <span className="font-semibold text-sm">{loanDetails.termMonths / 12} years</span>
            </div>

            {/* Down Payment */}
            <div className="flex flex-col items-center p-3 bg-white rounded-lg">
              <PiggyBank className="w-5 h-5 text-[#1EAEDB] mb-1" />
              <span className="text-xs text-gray-500">Down</span>
              <span className="font-semibold text-sm">${formatCurrency(loanDetails.downPayment)}</span>
            </div>

            {/* Trade-in Value */}
            <div className="flex flex-col items-center p-3 bg-white rounded-lg">
              <WalletIcon className="w-5 h-5 text-[#1EAEDB] mb-1" />
              <span className="text-xs text-gray-500">Trade-in</span>
              <span className="font-semibold text-sm">
                {tradeIn.netValue > 0 ? `$${formatCurrency(tradeIn.netValue)}` : '-'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
