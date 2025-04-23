
import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatCurrency } from '@/utils/financeCalculator';
import { ChevronDown } from 'lucide-react';

interface AddOn {
  id: string;
  name: string;
  price: number;
  included?: boolean;
}

const defaultFeatures: AddOn[] = [
  { id: 'basic-audio', name: 'Basic Audio System', price: 0, included: true },
  { id: 'power-windows', name: 'Power Windows', price: 0, included: true },
];

const optionalAddOns: AddOn[] = [
  { id: 'leather', name: 'Leather Seats', price: 1200 },
  { id: 'premium-audio', name: 'Premium Audio System', price: 800 },
  { id: 'tint', name: 'Window Tinting', price: 400 },
];

const VehicleInfo: React.FC = () => {
  const { state, dispatch } = useFinance();
  const [isAddOnsOpen, setIsAddOnsOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const handleAddOnToggle = (addOn: AddOn) => {
    const isSelected = selectedAddOns.some(item => item.id === addOn.id);
    let newSelected: AddOn[];
    
    if (isSelected) {
      newSelected = selectedAddOns.filter(item => item.id !== addOn.id);
    } else {
      newSelected = [...selectedAddOns, addOn];
    }
    
    setSelectedAddOns(newSelected);
    
    // Calculate total add-ons price
    const addOnsTotal = newSelected.reduce((sum, item) => sum + item.price, 0);
    dispatch({ 
      type: 'UPDATE_ADDONS_TOTAL', 
      payload: addOnsTotal 
    });
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
      <h2 className="text-xl font-bold text-[#1EAEDB] mb-4">Vehicle Info</h2>
      
      {/* Vehicle Image Placeholder */}
      <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-gray-400">Vehicle Image</span>
      </div>
      
      {/* Vehicle Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">2024 Sample Vehicle</h3>
        <div className="text-sm text-gray-500 mb-2">
          VIN: 1HGCM82633A123456
        </div>
        <div className="text-xl font-bold text-[#1EAEDB]">
          {formatCurrency(state.carPrice)}
        </div>
      </div>
      
      {/* Add-ons & Packages Dropdown */}
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
            {/* Included Features */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Included Features</h4>
              {defaultFeatures.map(feature => (
                <div key={feature.id} className="flex items-center py-2">
                  <span className="text-sm text-gray-600">{feature.name}</span>
                  <span className="ml-auto text-sm text-gray-400">Included</span>
                </div>
              ))}
            </div>
            
            {/* Optional Add-ons */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Available Add-ons</h4>
              {optionalAddOns.map(addOn => (
                <label key={addOn.id} className="flex items-center py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAddOns.some(item => item.id === addOn.id)}
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
