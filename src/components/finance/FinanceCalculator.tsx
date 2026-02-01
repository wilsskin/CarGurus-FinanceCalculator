import React from 'react';
import { FinanceProvider } from '../../context/finance';
import PageHeader from './PageHeader';
import SummaryBanner from './SummaryBanner';
import PaymentTypeSelector from './PaymentTypeSelector';
import VehicleInfo from './sections/VehicleInfo';
import MyFinanceInfo from './sections/MyFinanceInfo';
import CarCost from './sections/CarCost';
import SummaryAndSave from './SummaryAndSave';
import SaveAndExport from './sections/SaveAndExport';
import ScrollToTop from './ScrollToTop';
import EditButton from './EditButton';
import EstimatedRange from './sections/EstimatedRange';
import SimpleBarChart from './SummaryBarChart';
import { useFinance } from '../../context/finance';

const FinanceCalculatorContent: React.FC = () => {
  const { state } = useFinance();
  const { paymentType } = state;
  
  return (
    <div className="min-h-screen bg-background pb-28">
      <PageHeader />
      <SummaryBanner />
      
      {/* Vehicle & Payment Type Section */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-md px-4 space-y-5">
          <EditButton />
          <VehicleInfo />
          <PaymentTypeSelector />
        </div>
      </div>
      
      {/* Finance Info Section */}
      {paymentType !== 'cash' && (
        <div className="bg-section-light py-8 border-y border-border">
          <div className="mx-auto max-w-md px-4">
            <MyFinanceInfo />
          </div>
        </div>
      )}
      
      {/* Car Cost Section */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-md px-4">
          <CarCost />
        </div>
      </div>
      
      {/* Summary Section */}
      <div className="bg-section-light py-8 border-y border-border">
        <div className="mx-auto max-w-md px-4 space-y-6">
          <SummaryAndSave />
          {paymentType !== 'cash' && <EstimatedRange />}
        </div>
      </div>
      
      {/* Export & Breakdown Section */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-md px-4 space-y-6">
          <SaveAndExport />
          <div>
            <h3 className="mb-4">Cost Breakdown</h3>
            <SimpleBarChart />
          </div>
        </div>
      </div>
      
      <ScrollToTop />
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
