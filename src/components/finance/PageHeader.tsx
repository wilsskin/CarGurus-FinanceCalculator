import React from 'react';
import { ChevronLeft } from 'lucide-react';

const PageHeader: React.FC = () => {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-md px-4 py-3">
        <div className="flex items-center justify-center relative">
          {/* Back Button - Subtle circular style like CarGurus */}
          <button 
            className="absolute left-0 w-9 h-9 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors duration-200"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          
          {/* Centered Title */}
          <h1 className="text-[20px] font-semibold text-foreground">
            Finance Calculator
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
