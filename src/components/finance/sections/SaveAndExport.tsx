import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SaveAndExport: React.FC = () => {
  return (
    <div className="space-y-3">
      <Button
        onClick={() => {}}
        className="w-full"
      >
        <Heart className="w-5 h-5" />
        Save Estimate
      </Button>
      
      <Button
        onClick={() => {}}
        variant="outline"
        className="w-full"
      >
        <ExternalLink className="w-5 h-5" />
        Share Estimate
      </Button>
    </div>
  );
};

export default SaveAndExport;
