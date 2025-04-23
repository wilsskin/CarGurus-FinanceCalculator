
import React from 'react';
import { Save, Download } from 'lucide-react';

const SaveAndExport: React.FC = () => {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-20 animate-fade-in">
      <h2 className="text-xl font-bold text-[#1EAEDB] mb-6">Save & Export Estimate</h2>
      
      <div className="space-y-4">
        <button
          onClick={() => {}} // Will be implemented later
          className="w-full py-3 px-4 bg-[#1EAEDB] text-white rounded-lg font-medium hover:bg-[#1997BE] transition-colors flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Estimate
        </button>
        
        <button
          onClick={() => {}} // Will be implemented later
          className="w-full py-3 px-4 border-2 border-[#1EAEDB] text-[#1EAEDB] rounded-lg font-medium hover:bg-[#E9F6FB] transition-colors flex items-center justify-center"
        >
          <Download className="w-5 h-5 mr-2" />
          Export Estimate
        </button>
      </div>
    </section>
  );
};

export default SaveAndExport;
