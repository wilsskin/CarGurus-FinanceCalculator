
import React from 'react';
import FinanceCalculator from '../components/finance/FinanceCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-finance-gray-soft">
      <header className="bg-white shadow-sm py-3 px-4 fixed top-0 left-0 right-0 z-40 bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 mr-2"
              aria-label="Back"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Finance Calculator</h1>
          </div>
          
          <div>
            <button 
              className="text-finance-purple text-sm font-medium flex items-center"
              aria-label="Help"
            >
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help
            </button>
          </div>
        </div>
      </header>
      
      {/* Add padding top to account for fixed header */}
      <div className="pt-12">
        <FinanceCalculator />
      </div>
    </div>
  );
};

export default Index;
