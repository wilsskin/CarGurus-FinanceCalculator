
import React from 'react';
import { Save, Download } from 'lucide-react';

const SaveAndExport: React.FC = () => {
  return (
    <div className="space-y-4 mb-20 animate-fade-in">
      <button
        onClick={() => {}} // Will be implemented later
        className="w-full py-3 px-4 bg-[#0578BB] text-white rounded-lg font-medium hover:bg-[#1997BE] transition-colors flex items-center justify-center"
      >
        <Save className="w-5 h-5 mr-2" />
        Save Estimate
      </button>
      
      <button
        onClick={() => {}} // Will be implemented later
        className="w-full py-3 px-4 border-2 border-[#0578BB] text-[#0578BB] rounded-lg font-medium hover:bg-[#E9F6FB] transition-colors flex items-center justify-center"
      >
        <Download className="w-5 h-5 mr-2" />
        Export Estimate
      </button>
    </div>
  );
};

export default SaveAndExport;

