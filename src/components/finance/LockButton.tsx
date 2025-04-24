
import React from 'react';
import { Lock, LockOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface LockButtonProps {
  isLocked: boolean;
  onToggle: () => void;
  className?: string;
}

const LockButton: React.FC<LockButtonProps> = ({ isLocked, onToggle, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn('h-8 w-8 hover:bg-[#E9F6FB]', className)}
          >
            {isLocked ? (
              <Lock className="h-4 w-4 text-[#1EAEDB]" />
            ) : (
              <LockOpen className="h-4 w-4 text-[#8E9196]" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          <p className="text-xs">
            {isLocked
              ? "This value is locked and other fields will adjust to maintain it"
              : "Lock this value to maintain it while adjusting other fields"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LockButton;
