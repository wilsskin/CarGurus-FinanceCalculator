import React from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';

const VehicleInfo: React.FC = () => {
  const { state } = useFinance();

  return (
    <section>
      <button
        type="button"
        className="w-full flex items-center gap-4 text-left bg-background hover:bg-accent/30 transition-colors duration-200"
        aria-label="View vehicle details"
      >
        <div className="w-36 h-28 bg-muted rounded-cg overflow-hidden flex-shrink-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/car-image.png`}
            alt="2022 Toyota RAV4"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0 pr-4">
          <p className="font-medium text-foreground">2022 Toyota RAV4</p>
          <div className="text-caption text-muted-foreground mb-1">
            Used · 25,000 mi
          </div>
          <div className="text-price-sm font-bold text-foreground mb-2">
            {formatCurrency(state.carPrice)}
          </div>
          <span className="text-caption text-primary font-medium">View details</span>
        </div>
      </button>
    </section>
  );
};

export default VehicleInfo;
