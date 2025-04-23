
import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const creditScoreRanges = [
  { label: 'Excellent (720+)', value: '720' },
  { label: 'Good (690-719)', value: '690' },
  { label: 'Fair (630-689)', value: '630' },
  { label: 'Poor (Below 630)', value: '629' },
];

const MyFinanceInfo: React.FC = () => {
  const { state, dispatch } = useFinance();

  const handleCreditScoreChange = (value: string) => {
    dispatch({ 
      type: 'SET_CREDIT_SCORE', 
      payload: parseInt(value) 
    });
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
      <h2 className="text-xl font-bold text-[#1EAEDB] mb-6">My Finance Info</h2>
      
      {/* Credit Score Field */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estimated Credit Score
        </label>
        <Select
          value={state.creditScore?.toString()}
          onValueChange={handleCreditScoreChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your credit score range" />
          </SelectTrigger>
          <SelectContent>
            {creditScoreRanges.map(range => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Loan Details (only show if not paying cash) */}
      {state.paymentType !== 'cash' && (
        <>
          {/* Loan Term */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[36, 48, 60, 72, 84].map(months => (
                <button
                  key={months}
                  onClick={() => dispatch({
                    type: 'SET_LOAN_DETAILS',
                    payload: { termMonths: months }
                  })}
                  className={`
                    p-3 rounded-lg text-sm font-medium transition-colors
                    ${state.loanDetails.termMonths === months
                      ? 'bg-[#1EAEDB] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {months / 12} Years
                </button>
              ))}
            </div>
          </div>
          
          {/* Down Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={state.loanDetails.downPayment}
                onChange={(e) => dispatch({
                  type: 'SET_LOAN_DETAILS',
                  payload: { downPayment: parseFloat(e.target.value) || 0 }
                })}
                className="block w-full pl-7 py-3 border border-gray-300 rounded-lg focus:ring-[#1EAEDB] focus:border-[#1EAEDB]"
                placeholder="Enter down payment"
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MyFinanceInfo;
