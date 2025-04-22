
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface SectionFeedbackProps {
  message: string;
  visible: boolean;
  onHide?: () => void;
}

const SectionFeedback: React.FC<SectionFeedbackProps> = ({ 
  message, 
  visible, 
  onHide 
}) => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Only show toast when visible prop changes to true
    if (visible && message) {
      // Use the toast system instead of a custom component
      toast({
        title: message,
        duration: 3000,
        onOpenChange: (open) => {
          if (!open && onHide) onHide();
        }
      });
    }
  }, [visible, message, toast, onHide]);
  
  // This component no longer renders anything directly
  return null;
};

export default SectionFeedback;
