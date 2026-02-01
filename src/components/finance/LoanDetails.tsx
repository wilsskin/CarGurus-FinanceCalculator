import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, calculateMonthlyPayment } from '../../utils/financeCalculator';
import TipCard from './TipCard';
import { SegmentedControl, SegmentedControlItem } from '../ui/segmented-control';
import { Input } from '../ui/input';
import { FieldGroup, FieldLabel, FieldHelper } from '@/components/layout';

const loanTermOptions = [
  { months: 36, label: '3 yr' },
  { months: 48, label: '4 yr' },
  { months: 60, label: '5 yr' },
  { months: 72, label: '6 yr' },
  { months: 84, label: '7 yr' }
];

const LoanDetails: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { paymentType, loanDetails, carPrice, creditScore } = state;

  const [downPaymentPercent, setDownPaymentPercent] = useState(
    carPrice > 0 && loanDetails.downPayment > 0 ? Math.round((loanDetails.downPayment / carPrice) * 100) : 0
  );
  const [localAPR, setLocalAPR] = useState(loanDetails.interestRate?.toString() || '');
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

  const handleTermChange = (value: string) => {
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { termMonths: parseInt(value) }
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

  return (
    <section className="space-y-5">
      <h2>Loan Details</h2>

      {downPaymentPercent < 20 && monthlySavings > 20 && loanDetails.downPayment > 0 && (
        <TipCard
          tipText={`Want a lower monthly payment? Adding ${formatCurrency(increaseAmount)} to your down payment could save ${formatCurrency(monthlySavings)} per month.`}
          tipType="info"
        />
      )}

      <div className="space-y-5">
        {/* Down payment */}
        <FieldGroup>
          <FieldLabel>Down Payment</FieldLabel>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
              <Input
                type="number"
                value={loanDetails.downPayment || ''}
                onChange={handleDownPaymentChange}
                className="pl-8"
                placeholder="0"
                min={0}
                max={carPrice}
              />
            </div>
            <span className="text-muted-foreground text-sm font-medium">or</span>
            <div className="relative w-24">
              <Input
                type="number"
                value={downPaymentPercent || ''}
                onChange={handleDownPaymentPercentChange}
                className="pr-8 text-right"
                placeholder="0"
                min={0}
                max={100}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%</span>
            </div>
          </div>
          {carPrice > 0 && loanDetails.downPayment > 0 && (
            <FieldHelper>
              {downPaymentPercent}% of {formatCurrency(carPrice)}
            </FieldHelper>
          )}
        </FieldGroup>

        {/* Loan term - Segmented Control */}
        <FieldGroup>
          <FieldLabel>Loan Term</FieldLabel>
          <SegmentedControl 
            value={loanDetails.termMonths?.toString() || ''} 
            onValueChange={handleTermChange}
          >
            {loanTermOptions.map(term => (
              <SegmentedControlItem key={term.months} value={term.months.toString()}>
                <div className="flex flex-col items-center leading-tight">
                  <span className="text-sm font-semibold">{term.label}</span>
                  <span className="text-xs opacity-80">{term.months} mo</span>
                </div>
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </FieldGroup>

        {/* Interest rate / APR */}
        <FieldGroup>
          <FieldLabel>
            {paymentType === 'dealer' ? 'Estimated APR' : 'Interest Rate'}
          </FieldLabel>
          <div className="relative">
            <Input
              type="number"
              value={localAPR}
              onChange={handleAPRChange}
              className="pr-12"
              placeholder="e.g. 7.9"
              step={0.1}
              min={0}
              max={25}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%</span>
          </div>
          <FieldHelper>
            {creditScore 
              ? "Based on your credit score. You can edit the APR."
              : "Enter your credit score above to get a suggested rate."}
          </FieldHelper>
        </FieldGroup>
      </div>
    </section>
  );
};

export default LoanDetails;
