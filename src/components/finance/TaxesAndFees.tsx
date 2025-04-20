import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';

/**
 * Component for displaying and adjusting taxes and fees
 */
const TaxesAndFees: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { taxesAndFees, carPrice, zipCode } = state;
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const zip = event.target.value;
    if (zip.length <= 5 && /^\d*$/.test(zip)) {
      dispatch({ type: 'SET_ZIP_CODE', payload: zip });
    }
  };
  
  const handleTaxRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taxRate = parseFloat(event.target.value) || 0;
    const taxAmount = (carPrice * taxRate) / 100;
    
    dispatch({ 
      type: 'SET_TAXES_AND_FEES', 
      payload: { taxRate, taxAmount } 
    });
  };
  
  const handleFeeChange = (fee: keyof typeof taxesAndFees, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    
    dispatch({ 
      type: 'SET_TAXES_AND_FEES', 
      payload: { [fee]: value } 
    });
  };
  
  const totalFees = taxesAndFees.totalFees;
  const totalWithTax = totalFees + taxesAndFees.taxAmount;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 animate-slide-in">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-semibold text-gray-800">Taxes & Fees</h2>
        
        <div className="flex items-center">
          <span className="text-lg font-medium text-gray-700 mr-2">
            {formatCurrency(totalWithTax)}
          </span>
          <button className="p-1 rounded-full bg-gray-100">
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {!isExpanded ? (
        <p className="text-finance-gray-neutral text-sm mt-2">
          Estimated based on your location. Click to adjust.
        </p>
      ) : (
        <div className="mt-4 space-y-4 animate-fade-in">
          {/* Location / Zip code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            
            <input
              type="text"
              value={zipCode}
              onChange={handleZipCodeChange}
              className="block w-full py-3 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
              placeholder="Enter zip code"
              maxLength={5}
            />
            
            <div className="mt-1 text-sm text-finance-gray-neutral">
              Used to calculate taxes and fees for your area
            </div>
          </div>
          
          {/* Sales tax */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sales Tax Rate
            </label>
            
            <div className="relative">
              <input
                type="number"
                value={taxesAndFees.taxRate}
                onChange={handleTaxRateChange}
                className="block w-full pr-8 py-3 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
                placeholder="0"
                step="0.1"
                min="0"
                max="20"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            
            <div className="flex justify-between mt-1">
              <div className="text-sm text-finance-gray-neutral">
                Estimated for your location
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(taxesAndFees.taxAmount)}
              </div>
            </div>
          </div>
          
          {/* Fees */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Additional Fees</h3>
            
            <div className="space-y-3">
              {/* Registration fee */}
              <div className="flex items-center">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700">
                    Registration Fee
                  </label>
                </div>
                
                <div className="relative w-32">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={taxesAndFees.registrationFee}
                    onChange={(e) => handleFeeChange('registrationFee', e)}
                    className="block w-full pl-7 py-2 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
              
              {/* Document fee */}
              <div className="flex items-center">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700">
                    Document Fee
                  </label>
                </div>
                
                <div className="relative w-32">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={taxesAndFees.documentFee}
                    onChange={(e) => handleFeeChange('documentFee', e)}
                    className="block w-full pl-7 py-2 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
              
              {/* Dealer fee */}
              <div className="flex items-center">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700">
                    Dealer Processing Fee
                  </label>
                </div>
                
                <div className="relative w-32">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={taxesAndFees.dealerFee}
                    onChange={(e) => handleFeeChange('dealerFee', e)}
                    className="block w-full pl-7 py-2 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
              
              {/* Other fees */}
              <div className="flex items-center">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700">
                    Other Fees
                  </label>
                </div>
                
                <div className="relative w-32">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={taxesAndFees.otherFees}
                    onChange={(e) => handleFeeChange('otherFees', e)}
                    className="block w-full pl-7 py-2 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Total summary */}
          <div className="flex justify-between pt-3 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-700">
              Total Taxes & Fees
            </div>
            <div className="text-sm font-bold">
              {formatCurrency(totalWithTax)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxesAndFees;
