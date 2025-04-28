
import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, calculateMonthlyPayment } from '../../utils/financeCalculator';
import TipCard from './TipCard';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const LoanDetails: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { paymentType, loanDetails, carPrice, creditScore } = state;

  const [downPaymentPercent, setDownPaymentPercent] = useState(
    carPrice > 0 && loanDetails.downPayment > 0 ? Math.round((loanDetails.downPayment / carPrice) * 100) : 0
  );
  const [localAPR, setLocalAPR] = useState('');
  const [aprManuallyEdited, setAprManuallyEdited] = useState(false);

  useEffect(() => {
    if (carPrice > 0 && loanDetails.downPayment > 0) {
      setDownPaymentPercent(Math.round((loanDetails.downPayment / carPrice) * 100));
    } else {
      setDownPaymentPercent(0);
    }
  }, [carPrice, loanDetails.downPayment]);

  // Update APR based on credit score when it's set
  useEffect(() => {
    if (!aprManuallyEdited && creditScore) {
      let suggestedRate = 0;
      
      // Set APR based on credit score ranges
      if (creditScore >= 720) {
        suggestedRate = paymentType === 'dealer' ? 5.9 : 4.9;
      } else if (creditScore >= 690) {
        suggestedRate = paymentType === 'dealer' ? 6.9 : 5.9;
      } else if (creditScore >= 630) {
        suggestedRate = paymentType === 'dealer' ? 8.9 : 7.9;
      } else {
        suggestedRate = paymentType === 'dealer' ? 11.9 : 10.9;
      }
      
      setLocalAPR(suggestedRate.toString());
      dispatch({ type: 'SET_LOAN_DETAILS', payload: { interestRate: suggestedRate } });
    }
  }, [creditScore, paymentType, aprManuallyEdited, dispatch]);

  // Clear APR when payment type changes unless manually edited
  useEffect(() => {
    if (!aprManuallyEdited && !creditScore) {
      setLocalAPR('');
      dispatch({ type: 'SET_LOAN_DETAILS', payload: { interestRate: 0 } });
    }
  }, [paymentType, aprManuallyEdited, creditScore, dispatch]);

  const handleDownPaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { downPayment: value }
    });
    if (carPrice > 0) {
      setDownPaymentPercent(Math.round((value / carPrice) * 100));
    }
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

  // Only calculate payment impact if we have necessary values
  const calculatePaymentImpact = () => {
    if (!loanDetails.downPayment || !loanDetails.termMonths || !loanDetails.interestRate) {
      return { increaseAmount: 0, monthlySavings: 0 };
    }

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

      {downPaymentPercent < 20 && monthlySavings > 20 && loanDetails.downPayment > 0 && (
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
                value={loanDetails.downPayment || ''}
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
                value={downPaymentPercent || ''}
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
          {carPrice > 0 && loanDetails.downPayment > 0 && (
            <div className="mt-1 text-sm text-[#8E9196] font-normal">
              {downPaymentPercent}% of {formatCurrency(carPrice)}
            </div>
          )}
        </div>

        {/* Loan term modern toggle buttons */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-[#222]">
            Loan Term
          </label>
          <ToggleGroup type="single" value={loanDetails.termMonths ? loanDetails.termMonths.toString() : ''} onValueChange={v => v && handleTermChange(Number(v))} className="flex gap-2 w-full">
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
          {!loanDetails.termMonths && (
            <p className="mt-1 text-xs text-[#8E9196]">
              Please select a loan term to calculate your monthly payment
            </p>
          )}
        </div>

        {/* Interest rate / APR, editable with suggestions based on credit score */}
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
            {creditScore && !aprManuallyEdited && (
              <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center space-x-2 text-xs">
                <span className="bg-[#E9F6FB] text-[#1EAEDB] px-2 py-1 rounded font-bold">
                  Suggested: {localAPR}%
                </span>
              </div>
            )}
          </div>
          {/* Info text about APR */}
          <div className="mt-1 text-xs text-[#8E9196] font-normal">
            {creditScore 
              ? "Based on your credit score. You can edit the APR."
              : "Enter your credit score above to get a suggested rate."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
