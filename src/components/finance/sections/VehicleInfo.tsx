import React, { useState } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '@/utils/financeCalculator';
import { ChevronDown } from 'lucide-react';
import { AddonItem } from '@/types/financeTypes';

const defaultFeatures: AddonItem[] = [
  { id: 'basic-audio', name: 'Basic Audio System', price: 0, included: true },
  { id: 'power-windows', name: 'Power Windows', price: 0, included: true },
];

const optionalAddOns: AddonItem[] = [
  { id: 'leather', name: 'Leather Seats', price: 1200 },
  { id: 'premium-audio', name: 'Premium Audio System', price: 800 },
  { id: 'tint', name: 'Window Tinting', price: 400 },
];

const VehicleInfo: React.FC = () => {
  const { state, dispatch } = useFinance();
  const [isAddOnsOpen, setIsAddOnsOpen] = useState(false);

  const handleAddOnToggle = (addOn: AddonItem) => {
    const newSelectedAddons = { ...state.selectedAddons };
    
    if (newSelectedAddons[addOn.id]) {
      delete newSelectedAddons[addOn.id];
    } else {
      newSelectedAddons[addOn.id] = addOn;
    }
    
    // Update selected add-ons
    dispatch({ 
      type: 'UPDATE_ADDONS_TOTAL', 
      payload: Object.values(newSelectedAddons).reduce((sum, item) => sum + item.price, 0)
    });
    
    // Update the selected add-ons in state
    dispatch({
      type: 'UPDATE_SELECTED_ADDONS',
      payload: newSelectedAddons
    });
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
      <h2 className="text-xl font-bold text-[#1EAEDB] mb-4">Vehicle Info</h2>
      
      <div className="flex gap-4 mb-4">
        <div className="w-1/3 aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Vehicle Image</span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">2024 Sample Vehicle</h3>
          <div className="text-sm text-gray-500 mb-2">
            25,000 miles
          </div>
          <div className="text-xl font-bold text-[#1EAEDB]">
            {formatCurrency(state.carPrice)}
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => setIsAddOnsOpen(!isAddOnsOpen)}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-700">Add-ons & Packages</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isAddOnsOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isAddOnsOpen && (
          <div className="p-4 border-t">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Included Features</h4>
              {defaultFeatures.map(feature => (
                <div key={feature.id} className="flex items-center py-2">
                  <span className="text-sm text-gray-600">{feature.name}</span>
                  <span className="ml-auto text-sm text-gray-400">Included</span>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Available Add-ons</h4>
              {optionalAddOns.map(addOn => (
                <label key={addOn.id} className="flex items-center py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!state.selectedAddons[addOn.id]}
                    onChange={() => handleAddOnToggle(addOn)}
                    className="rounded border-gray-300 text-[#1EAEDB] focus:ring-[#1EAEDB]"
                  />
                  <span className="ml-2 text-sm text-gray-600">{addOn.name}</span>
                  <span className="ml-auto text-sm font-medium text-gray-700">
                    {formatCurrency(addOn.price)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleInfo;
