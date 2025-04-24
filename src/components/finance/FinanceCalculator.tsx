
import React from 'react';
import { FinanceProvider } from '../../context/finance';
import SummaryBanner from './SummaryBanner';
import PaymentTypeSelector from './PaymentTypeSelector';
import VehicleInfo from './sections/VehicleInfo';
import MyFinanceInfo from './sections/MyFinanceInfo';
import TradeIn from './TradeIn';
import CarCost from './sections/CarCost';
import SummaryAndSave from './SummaryAndSave';
import SaveAndExport from './sections/SaveAndExport';
import EditButton from './EditButton';

const FinanceCalculator: React.FC = () => {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-finance-gray-soft pb-10">
        <div className="py-4 bg-white border-b border-[#E6E8EB] mb-4">
          <SummaryBanner />
        </div>
        <div className="max-w-md mx-auto px-4">
          <EditButton />
          <VehicleInfo />
          <PaymentTypeSelector />
          <MyFinanceInfo />
          <TradeIn />
          <CarCost />
          <SummaryAndSave />
          <SaveAndExport />
        </div>
      </div>
    </FinanceProvider>
  );
};

export default FinanceCalculator;

