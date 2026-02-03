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
        
        <div className="flex-1 min-w-0 pr-4 flex flex-col">
          {/* Title + Price: one visual group */}
          <div className="flex flex-col gap-0.5">
            <p className="text-body-lg font-semibold leading-tight text-foreground">
              2022 Toyota RAV4
            </p>
            <div className="text-body font-medium text-foreground tabular-nums">
              {formatCurrency(state.carPrice)}
            </div>
          </div>
          {/* Metadata: detached, secondary */}
          <div className="mt-2 text-body-sm font-normal text-muted-foreground">
            Used · 27,500 mi
          </div>
        </div>
      </button>
    </section>
  );
};

export default VehicleInfo;
