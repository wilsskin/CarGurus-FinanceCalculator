import React from 'react';
import { Save, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SaveAndExport: React.FC = () => {
  return (
    <div className="space-y-3">
      <Button
        onClick={() => {}}
        className="w-full"
      >
        <Save className="w-5 h-5" />
        Save Estimate
      </Button>
      
      <Button
        onClick={() => {}}
        variant="outline"
        className="w-full"
      >
        <Download className="w-5 h-5" />
        Export Estimate
      </Button>
    </div>
  );
};

export default SaveAndExport;
