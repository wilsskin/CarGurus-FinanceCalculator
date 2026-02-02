import React from 'react';
import { FinanceProvider } from '../../context/finance';
import PageHeader from './PageHeader';
import SummaryBanner from './SummaryBanner';
import VehicleInfo from './sections/VehicleInfo';
import MyFinanceInfo from './sections/MyFinanceInfo';
import CarCost from './sections/CarCost';
import SummaryAndSave from './SummaryAndSave';
import EstimatedRange from './sections/EstimatedRange';

const FinanceCalculatorContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-28">
      <PageHeader />
      <SummaryBanner />
      
      {/* Vehicle Section */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-md px-4">
          <VehicleInfo />
        </div>
      </div>
      
      {/* Finance Info Section */}
      <div className="bg-section-light py-8">
        <div className="mx-auto max-w-md px-4">
          <MyFinanceInfo />
        </div>
      </div>
      
      {/* Car Cost Section */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-md px-4">
          <CarCost />
        </div>
      </div>
      
      {/* Summary Section */}
      <div className="bg-section-light py-8">
        <div className="mx-auto max-w-md px-4">
          <SummaryAndSave />
        </div>
      </div>
      
      {/* Estimated Range Section - white background like Car Cost */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-md px-4">
          <EstimatedRange />
        </div>
      </div>
    </div>
  );
};

const FinanceCalculator: React.FC = () => {
  return (
    <FinanceProvider>
      <FinanceCalculatorContent />
    </FinanceProvider>
  );
};

export default FinanceCalculator;
