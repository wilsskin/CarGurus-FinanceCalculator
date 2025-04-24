
export const animateValue = (element: HTMLElement | null) => {
  if (!element) return;
  
  element.classList.add('animate-highlight');
  
  setTimeout(() => {
    element.classList.remove('animate-highlight');
  }, 2000);
};
