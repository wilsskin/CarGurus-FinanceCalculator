
import React from 'react';
import { FinanceProvider } from '../../context/finance';
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
    <div className="min-h-screen bg-finance-gray-soft pb-28">
      <div className="py-4 bg-white border-b border-[#E6E8EB] mb-4">
        <SummaryBanner />
      </div>
      <div className="max-w-md mx-auto px-4 space-y-6">
        <EditButton />
        <div className="space-y-4">
          <VehicleInfo />
          <PaymentTypeSelector />
        </div>
        {paymentType !== 'cash' && <MyFinanceInfo />}
        <CarCost />
        <SummaryAndSave />
        {paymentType !== 'cash' && <EstimatedRange />}
        <SaveAndExport />
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#222] mb-4">Cost Breakdown</h3>
          <SimpleBarChart />
        </div>
        <ScrollToTop />
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
