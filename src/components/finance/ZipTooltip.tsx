
import React, { useState } from 'react';
import { Info } from 'lucide-react';

const ZipTooltip: React.FC<{ zip: string }> = ({ zip }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative flex items-center">
      <span
        tabIndex={0}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="cursor-pointer"
      >
        <Info className="inline w-4 h-4 text-primary" />
      </span>
      {show && (
        <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 w-64 p-4 bg-popover rounded-lg shadow-lg text-xs font-normal text-popover-foreground z-40 border border-border">
          ZIP code lets us estimate your taxes & fees. <br/>
          <span className="text-muted-foreground">Your ZIP will never be saved or shared.</span>
        </div>
      )}
    </span>
  );
};

export default ZipTooltip;
