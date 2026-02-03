/**
 * SummaryBanner: in-flow at top; when user scrolls past the page header it becomes fixed to the top.
 * Mobile (Safari / Chrome): we re-check sticky state on scroll, resize, visualViewport resize/scroll,
 * and after input/textarea/select blur (with delay) so the banner reliably reappears when the
 * keyboard closes. Uses env(safe-area-inset-top) and translateZ(0) for correct placement and
 * compositing on notched devices and iOS.
 */
import React, { useEffect, useRef, useState } from 'react';
import { useFinance } from '@/context/finance';
import { formatCurrency } from '../../utils/financeCalculator';

/** Scroll offset (px) past which the banner becomes fixed. Matches ~PageHeader height. */
const STICKY_THRESHOLD = 60;

/** Delay (ms) after input blur before re-checking sticky. Allows mobile keyboard to close and viewport to settle (iOS ~300ms). */
const FOCUSOUT_UPDATE_DELAY = 300;

const SummaryBanner: React.FC = () => {
  const { state } = useFinance();
  const { monthlyPayment, totalCost, loanDetails } = state;
  const noLoanDetails = !loanDetails.termMonths || !loanDetails.interestRate || loanDetails.interestRate === 0;
  const [isSticky, setIsSticky] = useState(false);
  const focusOutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateSticky = () => {
      setIsSticky(window.scrollY > STICKY_THRESHOLD);
    };

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateSticky();
        rafId = null;
      });
    };

    const handleResize = () => updateSticky();

    const handleFocusOut = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el?.tagName) return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) {
        if (focusOutTimeoutRef.current) clearTimeout(focusOutTimeoutRef.current);
        focusOutTimeoutRef.current = setTimeout(updateSticky, FOCUSOUT_UPDATE_DELAY);
      }
    };

    updateSticky();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('focusout', handleFocusOut, true);

    const vv = typeof window !== 'undefined' && window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', handleResize);
      vv.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (focusOutTimeoutRef.current) clearTimeout(focusOutTimeoutRef.current);
      focusOutTimeoutRef.current = null;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('focusout', handleFocusOut, true);
      if (vv) {
        vv.removeEventListener('resize', handleResize);
        vv.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div 
      className={`
        w-full bg-background border-b border-border z-50
        ${isSticky ? 'fixed left-0 right-0 shadow-sm animate-banner-reveal' : 'transition-shadow duration-200 ease-out'}
      `}
      style={isSticky ? { 
        top: 'env(safe-area-inset-top, 0px)',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
      } : undefined}
    >
      <div className="mx-auto max-w-md px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side: Header text left-aligned */}
          <span className="text-label font-semibold text-foreground">
            Estimated Payment
          </span>

          {/* Right side: Cost values - Compact like CarGurus */}
          <div className="flex items-center gap-2">
            <span className="text-price-sm font-bold text-foreground">
              {noLoanDetails ? '—' : formatCurrency(monthlyPayment)}<span className="text-caption font-normal text-muted-foreground">/mo</span>
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-price-sm font-bold text-foreground">
              {noLoanDetails ? '—' : formatCurrency(totalCost)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBanner;
