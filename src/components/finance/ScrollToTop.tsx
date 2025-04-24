
import React, { useState, useEffect } from 'react';
import { CircleArrowUp } from 'lucide-react';

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
      className="fixed bottom-20 right-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-[#E9F6FB] transition-colors duration-200 animate-fade-in"
      aria-label="Scroll to top"
    >
      <CircleArrowUp className="w-8 h-8 text-[#1EAEDB]" />
    </button>
  );
};

export default ScrollToTop;
