import React, { useState, useEffect, useRef } from 'react';
import { FinanceProvider, useFinance } from '../../context/FinanceContext';
import SummaryBanner from './SummaryBanner';
import CarPrice from './CarPrice';
import PaymentTypeSelector from './PaymentTypeSelector';
import LoanDetails from './LoanDetails';
import TradeIn from './TradeIn';
import TaxesAndFees from './TaxesAndFees';
import SummaryAndSave from './SummaryAndSave';
import SectionFeedback from './SectionFeedback';
import ProgressIndicator from './ProgressIndicator';

/**
 * Main Finance Calculator component that assembles all the sections
 */
const FinanceCalculator: React.FC = () => {
  const [feedback, setFeedback] = useState({
    message: '',
    visible: false
  });
  const [showIntro, setShowIntro] = useState(true);
  const [completedSections, setCompletedSections] = useState(1); // Start with 1 (car price)

  // Track if sections are filled out
  const [sectionState, setSectionState] = useState({
    carPrice: true,
    // Always true as it's pre-filled
    paymentType: true,
    // Always true as it's pre-selected
    loanDetails: false,
    tradeIn: false,
    taxesAndFees: false,
    summary: false
  });

  // Hide intro animation after first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Monitor completed sections
  useEffect(() => {
    const totalSections = Object.values(sectionState).filter(Boolean).length;
    if (totalSections !== completedSections) {
      setCompletedSections(totalSections);

      // Show feedback if a new section was completed
      if (totalSections > completedSections) {
        const sectionNames = {
          loanDetails: 'Loan details added',
          tradeIn: 'Trade-in added',
          taxesAndFees: 'Taxes & fees updated',
          summary: 'Summary complete'
        };

        // Find the newly completed section
        const newSection = Object.entries(sectionState).find(([key, completed]) => !completed && key in sectionNames)?.[0];
        if (newSection && newSection in sectionNames) {
          showFeedback(sectionNames[newSection as keyof typeof sectionNames]);
        }
      }
    }
  }, [sectionState, completedSections]);

  // Function to show feedback messages when sections are completed
  const showFeedback = (message: string) => {
    setFeedback({
      message,
      visible: true
    });
    setTimeout(() => {
      setFeedback(prev => ({
        ...prev,
        visible: false
      }));
    }, 3000);
  };

  // Function to mark a section as completed
  const completeSection = (section: keyof typeof sectionState) => {
    setSectionState(prev => ({
      ...prev,
      [section]: true
    }));
  };

  // Create section labels for the progress indicator
  const sectionLabels = ['Car Price', 'Payment Type', 'Loan Details', 'Trade-In', 'Taxes & Fees', 'Summary'];

  // Section completion effect with staggered animations
  const FinanceCalculatorContent: React.FC = () => {
    const {
      state
    } = useFinance();
    const prevStateRef = useRef(state);

    // Watch for changes in state to determine when sections are completed
    useEffect(() => {
      const prevState = prevStateRef.current;

      // Check if loan details were filled out
      if (state.paymentType !== 'cash' && (prevState.loanDetails.downPayment !== state.loanDetails.downPayment || prevState.loanDetails.termMonths !== state.loanDetails.termMonths || prevState.loanDetails.interestRate !== state.loanDetails.interestRate)) {
        completeSection('loanDetails');
      }

      // Check if trade-in was added
      if (prevState.tradeIn.value === 0 && state.tradeIn.value > 0 || prevState.tradeIn.owedAmount === 0 && state.tradeIn.owedAmount > 0) {
        completeSection('tradeIn');
      }

      // Check if taxes & fees were modified
      if (prevState.zipCode !== state.zipCode || prevState.taxesAndFees.taxRate !== state.taxesAndFees.taxRate || prevState.taxesAndFees.totalFees !== state.taxesAndFees.totalFees) {
        completeSection('taxesAndFees');
      }

      // Update the reference
      prevStateRef.current = state;
    }, [state]);
    return <>
        {/* Progress indicator */}
        
        {/* Moved PaymentTypeSelector above CarPrice */}
        <PaymentTypeSelector />
        <CarPrice />
        <LoanDetails />
        <TradeIn />
        <TaxesAndFees />
        <SummaryAndSave />
      </>;
  };
  return <FinanceProvider>
      <div className="min-h-screen bg-finance-gray-soft pb-10">
        {/* Introduction overlay - shown only on first load */}
        {showIntro && <div className="fixed inset-0 bg-white z-50 flex items-center justify-center animate-fade-out">
            <div className="text-center p-6 max-w-sm">
              <div className="w-16 h-16 mx-auto bg-finance-purple rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Finance Calculator</h1>
              <p className="text-gray-600">
                Explore your financing options and get a transparent estimate of your car payments.
              </p>
            </div>
          </div>}
        
        {/* Feedback toast for section completion */}
        <SectionFeedback message={feedback.message} visible={feedback.visible} onHide={() => setFeedback(prev => ({
        ...prev,
        visible: false
      }))} />
        
        {/* No longer need vertical padding here since the banner has its own spacing */}
        <SummaryBanner />
        
        {/* Main content */}
        <div className="max-w-md mx-auto px-4">
          <FinanceCalculatorContent />
        </div>
      </div>
    </FinanceProvider>;
};
export default FinanceCalculator;
