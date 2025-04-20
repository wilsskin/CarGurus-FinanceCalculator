
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';

/**
 * Component for displaying and adjusting car price
 */
const CarPrice: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { carPrice } = state;
  
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(event.target.value) || 0;
    dispatch({ type: 'SET_CAR_PRICE', payload: price });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Vehicle Price</h2>
      
      <div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            value={carPrice}
            onChange={handlePriceChange}
            className="block w-full pl-7 py-3 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
            placeholder="Enter vehicle price"
            min="0"
          />
        </div>
        
        <div className="mt-1 text-sm text-finance-gray-neutral">
          Price shown is before taxes, fees, and incentives
        </div>
      </div>
    </div>
  );
};

export default CarPrice;
