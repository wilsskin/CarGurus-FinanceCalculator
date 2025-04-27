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
    <section className="mb-6">
      <h2 className="text-xl font-bold text-[#1EAEDB] mb-4">Vehicle Info</h2>
      
      <div className="flex gap-4 mb-4">
        <div className="w-1/3 aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src="/lovable-uploads/30e6bd69-7f65-45ee-b3a6-8cb91ded05ac.png"
            alt="2022 Toyota RAV4"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">2022 Toyota RAV4</h3>
          <div className="text-sm text-gray-500 mb-2">Preowned • 25,000 miles</div>
          <div className="text-xl font-bold text-[#1EAEDB]">
            {formatCurrency(state.carPrice)}
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <button onClick={() => setIsAddOnsOpen(!isAddOnsOpen)} className="w-full h-12 px-5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Add-ons & Packages</span>
            <span className="font-medium text-[#1EAEDB]">
              ({formatCurrency(selectedAddonsTotal)})
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${isAddOnsOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isAddOnsOpen && <div className="p-4 border-t">
            {selectedAddonsCount > 0 && <div className="text-sm font-medium text-[#1EAEDB] mb-4 pb-3 border-b">
                Selected Add-ons: {selectedAddonsCount} items — {formatCurrency(selectedAddonsTotal)}
              </div>}
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Included Features</h4>
              {defaultFeatures.map(feature => <div key={feature.id} className="flex items-center py-2 px-1">
                  <span className="text-sm text-gray-600">{feature.name}</span>
                  <span className="ml-auto text-sm text-gray-400">Included</span>
                </div>)}
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Available Add-ons</h4>
              {[...optionalAddOns, ...customAddons].map(addOn => <label key={addOn.id} className="flex items-center py-2 px-1 cursor-pointer group">
                  <input type="checkbox" checked={!!state.selectedAddons[addOn.id]} onChange={() => handleAddOnToggle(addOn)} className="rounded border-gray-300 text-[#1EAEDB] focus:ring-[#1EAEDB]" />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {addOn.name}
                  </span>
                  <span className="ml-auto text-sm font-medium text-gray-700">
                    {formatCurrency(addOn.price)}
                  </span>
                </label>)}
              
              <CustomAddonForm onAdd={handleCustomAddonAdd} />
            </div>
          </div>}
      </div>
    </section>
  );
};

export default VehicleInfo;
