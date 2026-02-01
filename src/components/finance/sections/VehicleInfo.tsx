import React, { useState } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { ChevronDown } from 'lucide-react';
import { AddonItem } from '@/types/financeTypes';
import CustomAddonForm from '../addons/CustomAddonForm';

const defaultFeatures: AddonItem[] = [{
  id: 'basic-audio',
  name: 'Basic Audio System',
  price: 0,
  included: true
}, {
  id: 'power-windows',
  name: 'Power Windows',
  price: 0,
  included: true
}];

const optionalAddOns: AddonItem[] = [{
  id: 'leather',
  name: 'Leather Seats',
  price: 1200
}, {
  id: 'premium-audio',
  name: 'Premium Audio System',
  price: 800
}, {
  id: 'tint',
  name: 'Window Tinting',
  price: 400
}];

const VehicleInfo: React.FC = () => {
  const { state, dispatch } = useFinance();
  const [isAddOnsOpen, setIsAddOnsOpen] = useState(false);
  const [customAddons, setCustomAddons] = useState<AddonItem[]>([]);
  
  const selectedAddonsCount = Object.keys(state.selectedAddons).length;
  const selectedAddonsTotal = Object.values(state.selectedAddons).reduce((sum, item) => sum + item.price, 0);

  const handleAddOnToggle = (addOn: AddonItem) => {
    const newSelectedAddons = {
      ...state.selectedAddons
    };
    if (newSelectedAddons[addOn.id]) {
      delete newSelectedAddons[addOn.id];
    } else {
      newSelectedAddons[addOn.id] = addOn;
    }
    dispatch({
      type: 'UPDATE_ADDONS_TOTAL',
      payload: Object.values(newSelectedAddons).reduce((sum, item) => sum + item.price, 0)
    });
    dispatch({
      type: 'UPDATE_SELECTED_ADDONS',
      payload: newSelectedAddons
    });
  };

  const handleCustomAddonAdd = (addon: AddonItem) => {
    setCustomAddons([...customAddons, addon]);
    handleAddOnToggle(addon);
  };

  return (
    <section>
      <div className="flex gap-4 mb-5">
        <div className="w-28 h-20 bg-muted rounded-cg overflow-hidden flex-shrink-0">
          <img 
            src="public/lovable-uploads/car-image.png"
            alt="2022 Toyota RAV4"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-foreground truncate">2022 Toyota RAV4</h3>
          <div className="text-body-sm text-muted-foreground mb-1">Preowned • 25,000 miles</div>
          <div className="text-price-md text-foreground">
            {formatCurrency(state.carPrice)}
          </div>
        </div>
      </div>
      
      <div className="border border-border rounded-cg overflow-hidden">
        <button 
          onClick={() => setIsAddOnsOpen(!isAddOnsOpen)} 
          className="w-full h-14 px-4 flex items-center justify-between bg-background hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Add-ons & Packages</span>
            {selectedAddonsTotal > 0 && (
              <span className="font-semibold text-primary">
                +{formatCurrency(selectedAddonsTotal)}
              </span>
            )}
          </div>
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isAddOnsOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isAddOnsOpen && (
          <div className="p-4 border-t border-border bg-section-light">
            {selectedAddonsCount > 0 && (
              <div className="text-body-sm font-semibold text-primary mb-4 pb-4 border-b border-border">
                {selectedAddonsCount} selected — {formatCurrency(selectedAddonsTotal)}
              </div>
            )}
            
            <div className="mb-6">
              <h4 className="text-caption font-semibold text-muted-foreground uppercase tracking-wider mb-3">Included Features</h4>
              {defaultFeatures.map(feature => (
                <div key={feature.id} className="flex items-center py-2">
                  <span className="text-body-sm text-muted-foreground">{feature.name}</span>
                  <span className="ml-auto text-caption text-muted-foreground">Included</span>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-caption font-semibold text-muted-foreground uppercase tracking-wider mb-3">Available Add-ons</h4>
              {[...optionalAddOns, ...customAddons].map(addOn => (
                <label key={addOn.id} className="flex items-center py-3 cursor-pointer group border-b border-border last:border-b-0">
                  <input 
                    type="checkbox" 
                    checked={!!state.selectedAddons[addOn.id]} 
                    onChange={() => handleAddOnToggle(addOn)} 
                    className="w-5 h-5 rounded border-input text-primary focus:ring-primary focus:ring-offset-0" 
                  />
                  <span className="ml-3 text-body-sm font-medium text-foreground">
                    {addOn.name}
                  </span>
                  <span className="ml-auto text-body-sm font-semibold text-foreground">
                    +{formatCurrency(addOn.price)}
                  </span>
                </label>
              ))}
              
              <div className="mt-4">
                <CustomAddonForm onAdd={handleCustomAddonAdd} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleInfo;
