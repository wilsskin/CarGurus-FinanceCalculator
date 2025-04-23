
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

const FinanceCalculator: React.FC = () => {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-finance-gray-soft pb-10">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-[#1EAEDB] py-6">Finance Calculator</h1>
          
          <VehicleInfo />
          <PaymentTypeSelector />
          <MyFinanceInfo />
          <TradeIn />
          <CarCost />
          <SummaryAndSave />
          <SaveAndExport />
        </div>
        <SummaryBanner />
      </div>
    </FinanceProvider>
  );
};

export default FinanceCalculator;
