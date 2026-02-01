
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-[4.5rem] right-1/2 transform translate-x-1/2 z-50 p-2 bg-card rounded-full shadow-lg border border-border hover:bg-accent transition-colors duration-200 animate-fade-in"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6 text-primary" />
    </button>
  );
};

export default ScrollToTop;
