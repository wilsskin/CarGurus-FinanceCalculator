
import React from 'react';
import { Lock, LockOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface LockButtonProps {
  isLocked: boolean;
  onToggle: () => void;
  className?: string;
}

const LockButton: React.FC<LockButtonProps> = ({ isLocked, onToggle, className }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn('h-8 w-8 hover:bg-[#E9F6FB]', className)}
      title={isLocked ? 'Unlock this value' : 'Lock this value'}
    >
      {isLocked ? (
        <Lock className="h-4 w-4 text-[#1EAEDB]" />
      ) : (
        <LockOpen className="h-4 w-4 text-[#8E9196]" />
      )}
    </Button>
  );
};

export default LockButton;
