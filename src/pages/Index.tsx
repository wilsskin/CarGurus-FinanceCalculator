

import React from 'react';
import FinanceCalculator from '../components/finance/FinanceCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FB] flex flex-col font-sans max-w-md mx-auto w-full">
      <header className="bg-white shadow-sm py-3 px-4 fixed top-0 left-0 right-0 z-40 bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="p-2 rounded-full hover:bg-[#E9F6FB] mr-2"
              aria-label="Back"
            >
              <svg className="w-5 h-5 text-[#1EAEDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-extrabold text-[#1EAEDB] tracking-tight">Finance Calculator</h1>
          </div>
          <div>
            <button
              className="text-[#1EAEDB] text-base font-bold flex items-center"
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
      {/* Padding for sticky header */}
      <div className="pt-16 flex-1 pb-20">
        <FinanceCalculator />
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E6E8EB] shadow-lg">
        <div className="flex justify-around max-w-md mx-auto py-2">
          {/* Simple icons for nav, as placeholder */}
          <button className="flex flex-col items-center text-[#1EAEDB] px-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10m-7 7a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center text-[#8E9196] px-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6m6 13V6m-9 6v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 012 2v6a2 2 0 002 2h2a2 2 0 002-2v-6" />
            </svg>
            <span className="text-xs">History</span>
          </button>
          <button className="flex flex-col items-center text-[#8E9196] px-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v4m0 0v4m0-4h4m-4 0H8" />
            </svg>
            <span className="text-xs">Add</span>
          </button>
          <button className="flex flex-col items-center text-[#8E9196] px-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h4m-2-2v4m4-4h.01" />
            </svg>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
