
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

const FinanceCalculator: React.FC = () => {
  return (
    <FinanceProvider>
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
          <MyFinanceInfo />
          <CarCost />
          <SummaryAndSave />
          <EstimatedRange />
          <SaveAndExport />
          <ScrollToTop />
        </div>
      </div>
    </FinanceProvider>
  );
};

export default FinanceCalculator;
