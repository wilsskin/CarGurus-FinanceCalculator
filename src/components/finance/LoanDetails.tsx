

import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, calculateMonthlyPayment } from '../../utils/financeCalculator';
import TipCard from './TipCard';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const LoanDetails: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { paymentType, loanDetails, carPrice } = state;

  const [downPaymentPercent, setDownPaymentPercent] = useState(
    Math.round((loanDetails.downPayment / carPrice) * 100)
  );
  const [localAPR, setLocalAPR] = useState(loanDetails.interestRate || '');
  const [aprManuallyEdited, setAprManuallyEdited] = useState(false);

  useEffect(() => {
    setDownPaymentPercent(Math.round((loanDetails.downPayment / carPrice) * 100));
  }, [carPrice, loanDetails.downPayment]);

  // When paymentType changes or loan type switches, re-suggest an APR unless user edited
  useEffect(() => {
    if (!aprManuallyEdited) {
      // CG: auto-suggest but not prefill. Just show "Suggested: X%"
      let suggested = paymentType === 'dealer' ? 7.9 : 6.5;
      setLocalAPR('');
      dispatch({ type: 'SET_LOAN_DETAILS', payload: { interestRate: 0 } });
    }
  }, [paymentType]);

  const handleDownPaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { downPayment: value }
    });
    setDownPaymentPercent(Math.round((value / carPrice) * 100));
  };

  const handleDownPaymentPercentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(event.target.value) || 0;
    setDownPaymentPercent(percent);
    const newDownPayment = (carPrice * percent) / 100;
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { downPayment: newDownPayment }
    });
  };

  const handleTermChange = (months: number) => {
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { termMonths: months }
    });
  };

  const handleAPRChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalAPR(event.target.value);
    setAprManuallyEdited(true);
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { interestRate: parseFloat(event.target.value) || 0 }
    });
  };

  if (paymentType === 'cash') {
    return null;
  }

  const termOptions = [36, 48, 60, 72, 84];

  const calculatePaymentImpact = () => {
    const currentDownPayment = loanDetails.downPayment;
    const increaseAmount = carPrice * 0.05;
    const newDownPayment = currentDownPayment + increaseAmount;
    const currentLoanAmount = carPrice - currentDownPayment;
    const newLoanAmount = carPrice - newDownPayment;
    const currentPayment = calculateMonthlyPayment(
      currentLoanAmount,
      loanDetails.interestRate,
      loanDetails.termMonths
    );
    const newPayment = calculateMonthlyPayment(
      newLoanAmount,
      loanDetails.interestRate,
      loanDetails.termMonths
    );
    const monthlySavings = currentPayment - newPayment;
    return {
      increaseAmount: Math.round(increaseAmount),
      monthlySavings: Math.round(monthlySavings)
    };
  };

  const { increaseAmount, monthlySavings } = calculatePaymentImpact();

  // CarGurus style rounded boxes, modern toggles, larger tap area
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 animate-slide-in">
      <h2 className="text-xl font-bold mb-4 text-[#1EAEDB]">Loan Details</h2>

      {downPaymentPercent < 20 && monthlySavings > 20 && (
        <TipCard
          tipText={`Want a lower monthly payment? Adding ${formatCurrency(increaseAmount)} to your down payment could save ${formatCurrency(monthlySavings)} per month.`}
          tipType="info"
        />
      )}

      <div className="space-y-6">
        {/* Down payment */}
        <div>
          <label className="block text-sm font-semibold text-[#222] mb-1">
            Down Payment
          </label>
          <div className="flex items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={loanDetails.downPayment}
                onChange={handleDownPaymentChange}
                className="block w-full pl-7 pr-12 py-3 border border-[#E6E8EB] rounded-xl focus:ring-[#1EAEDB] focus:border-[#1EAEDB] font-semibold bg-[#F7F8FB] text-base transition"
                placeholder="0"
                min="0"
                max={carPrice}
              />
            </div>
            <div className="mx-4 text-[#8E9196]">or</div>
            <div className="relative w-24">
              <input
                type="number"
                value={downPaymentPercent}
                onChange={handleDownPaymentPercentChange}
                className="block w-full pr-8 py-3 border border-[#E6E8EB] rounded-xl focus:ring-[#1EAEDB] focus:border-[#1EAEDB] font-semibold bg-[#F7F8FB] text-base transition"
                placeholder="0"
                min="0"
                max="100"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400 sm:text-sm">%</span>
              </div>
            </div>
          </div>
          <div className="mt-1 text-sm text-[#8E9196] font-normal">
            {downPaymentPercent}% of {formatCurrency(carPrice)}
          </div>
        </div>

        {/* Loan term modern toggle buttons */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-[#222]">
            Loan Term
          </label>
          <ToggleGroup type="single" value={loanDetails.termMonths.toString()} onValueChange={v => v && handleTermChange(Number(v))} className="flex gap-2 w-full">
            {termOptions.map(months => (
              <ToggleGroupItem
                key={months}
                value={months.toString()}
                className={`px-4 py-3 rounded-xl text-base font-semibold w-full transition min-w-[60px]
                  ${loanDetails.termMonths === months
                      ? 'bg-[#1EAEDB] text-white shadow'
                      : 'bg-[#F5F7F9] text-[#222] border border-[#D5D8DF]'
                  }
                `}
                aria-label={`${months / 12} years`}
              >
                {(months / 12).toFixed(0)} yr
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Interest rate / APR, editable with CG-suggested tag and info */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-[#222]">
            {paymentType === 'dealer' ? 'Estimated APR' : 'Interest Rate'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={localAPR}
              onChange={handleAPRChange}
              className="block w-full pr-20 py-3 border border-[#E6E8EB] rounded-xl focus:ring-[#1EAEDB] focus:border-[#1EAEDB] font-semibold bg-[#F7F8FB] text-base transition"
              placeholder="e.g. 7.9"
              step="0.1"
              min="0"
              max="25"
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center space-x-2 text-xs">
              {!aprManuallyEdited && (
                <span className="bg-[#E9F6FB] text-[#1EAEDB] px-2 py-1 rounded font-bold">
                  Suggested: {paymentType === 'dealer' ? '7.9%' : '6.5%'}
                </span>
              )}
              {paymentType === 'dealer' && (
                <span className="text-[#8E9196] ml-1">
                  (typical: 3.5-9.5%)
                </span>
              )}
            </div>
          </div>
          {/* Info text about suggestion */}
          <div className="mt-1 text-xs text-[#8E9196] font-normal">
            We’ve suggested a typical rate. You can edit the APR.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
