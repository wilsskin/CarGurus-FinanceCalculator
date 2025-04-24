
import React from 'react';
import { useFinance } from '../../../context/FinanceContext';
import { formatCurrency } from '../../../utils/financeCalculator';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { CalendarDays, DollarSign } from 'lucide-react';

const FinanceSummary: React.FC = () => {
  const { state } = useFinance();
  const { loanDetails, tradeIn, paymentType } = state;

  if (paymentType === 'cash') return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-[#1EAEDB]">Finance Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-3 bg-[#F7F8FB] rounded-lg">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-[#1EAEDB]" />
              <span className="text-sm font-medium">Loan Term</span>
            </div>
            <span className="text-sm font-bold">{loanDetails.termMonths / 12} years</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-[#F7F8FB] rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#1EAEDB]" />
              <span className="text-sm font-medium">Down Payment</span>
            </div>
            <span className="text-sm font-bold">${formatCurrency(loanDetails.downPayment)}</span>
          </div>

          {tradeIn.netValue > 0 && (
            <div className="flex items-center justify-between p-3 bg-[#F7F8FB] rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#1EAEDB]" />
                <span className="text-sm font-medium">Trade-in Value</span>
              </div>
              <span className="text-sm font-bold">${formatCurrency(tradeIn.netValue)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinanceSummary;
