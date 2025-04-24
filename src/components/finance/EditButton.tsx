
import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '../ui/button';
import { useFinance } from '@/context/finance';

const EditButton = () => {
  const { state } = useFinance();
  const [modifiedFields, setModifiedFields] = useState(0);
  
  // Track modifications to default values
  useEffect(() => {
    let count = 0;
    if (state.loanDetails.interestRate !== 5.9) count++;
    if (state.tradeIn.value > 0) count++;
    if (state.addonsTotal > 0) count++;
    setModifiedFields(count);
  }, [state.loanDetails.interestRate, state.tradeIn.value, state.addonsTotal]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className="fixed top-4 right-4 z-50 hover:bg-[#E9F6FB] bg-white shadow-sm"
    >
      <Edit className="w-4 h-4 text-[#1EAEDB]" />
      {modifiedFields > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#1EAEDB] text-white text-xs rounded-full flex items-center justify-center animate-scale-in">
          {modifiedFields}
        </span>
      )}
    </Button>
  );
};

export default EditButton;
