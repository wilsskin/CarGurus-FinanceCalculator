/**
 * Finance calculator utility functions
 */

// Get suggested interest rate based on credit score and financing source
export const getInterestRateForCreditScore = (
  creditScore: number,
  paymentType: 'dealer' | 'outside'
): number => {
  if (creditScore >= 720) {
    return paymentType === 'dealer' ? 5.9 : 4.9;
  }
  if (creditScore >= 690) {
    return paymentType === 'dealer' ? 6.9 : 5.9;
  }
  if (creditScore >= 630) {
    return paymentType === 'dealer' ? 8.9 : 7.9;
  }
  return paymentType === 'dealer' ? 11.9 : 10.9;
};

// Calculate monthly payment for a loan
export const calculateMonthlyPayment = (
  loanAmount: number,
  interestRate: number,
  loanTermMonths: number
): number => {
  // Convert annual interest rate to monthly decimal rate
  const monthlyRate = interestRate / 100 / 12;
  
  // If interest rate is 0, just divide the principal by term
  if (monthlyRate === 0) {
    return loanAmount / loanTermMonths;
  }
  
  // Use loan payment formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const payment = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
    (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  
  return payment;
};

// Calculate total loan cost
export const calculateTotalLoanCost = (
  monthlyPayment: number,
  loanTermMonths: number
): number => {
  return monthlyPayment * loanTermMonths;
};

// Calculate loan amount after down payment
export const calculateLoanAmount = (
  carPrice: number,
  downPayment: number,
  tradeInValue: number = 0,
  tradeInOwed: number = 0,
  taxes: number = 0,
  fees: number = 0
): number => {
  const tradeInEquity = Math.max(0, tradeInValue - tradeInOwed);
  return carPrice + taxes + fees - downPayment - tradeInEquity;
};

// Format currency with appropriate symbol and decimal places
export const formatCurrency = (amount: number): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  // Ensure we don't have double dollar signs ($$)
  return formatted.replace(/\$\$+/g, '$');
};

// Calculate average tax rate based on location (simplified)
export const estimateTaxRate = (zipCode: string): number => {
  // In a real app, this would call an API or use a lookup table
  // This is just a placeholder implementation
  const firstDigit = parseInt(zipCode.charAt(0));
  
  // Very simplified tax estimation
  const baseTaxRates = [5.5, 6.2, 6.8, 5.7, 6.3, 7.2, 4.9, 6.0, 5.3, 6.5];
  
  return baseTaxRates[firstDigit] || 6.0; // Default to 6% if invalid
};

// Calculate tax amount based on car price and tax rate
export const calculateTaxAmount = (carPrice: number, taxRate: number): number => {
  return carPrice * (taxRate / 100);
};

// Estimate fees based on car price (simplified)
export const estimateFees = (carPrice: number): number => {
  // In a real app, this would be more complex and location-based
  const registrationFee = 300;
  const documentFee = 100;
  const dealerFee = Math.min(carPrice * 0.01, 500); // 1% of car price up to $500
  
  return registrationFee + documentFee + dealerFee;
};

// Generate payment range estimation (for the initial estimate range)
export const generatePaymentRange = (
  carPrice: number,
  downPaymentPercent: number = 10,
  termMonths: number = 60,
  minRate: number = 3.5,
  maxRate: number = 7.5
): { minMonthly: number; maxMonthly: number; minTotal: number; maxTotal: number } => {
  const downPayment = carPrice * (downPaymentPercent / 100);
  const loanAmount = carPrice - downPayment;
  
  const minMonthly = calculateMonthlyPayment(loanAmount, minRate, termMonths);
  const maxMonthly = calculateMonthlyPayment(loanAmount, maxRate, termMonths);
  
  const minTotal = calculateTotalLoanCost(minMonthly, termMonths) + downPayment;
  const maxTotal = calculateTotalLoanCost(maxMonthly, termMonths) + downPayment;
  
  return {
    minMonthly,
    maxMonthly,
    minTotal,
    maxTotal
  };
};
