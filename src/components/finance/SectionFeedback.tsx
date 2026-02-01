import React, { useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

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
  useEffect(() => {
    if (visible && message) {
      toast.info(message, {
        duration: 3000,
        onDismiss: onHide,
        onAutoClose: onHide,
      });
    }
  }, [visible, message, onHide]);
  
  return null;
};

export default SectionFeedback;
