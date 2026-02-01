import React from "react";
import { useFinance } from "../../context/finance";
import { PaymentType } from "../../types/financeTypes";
import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control";

const paymentOptions = [
  { value: "dealer", label: "Dealer Financing" },
  { value: "outside", label: "Outside Loan" },
  { value: "cash", label: "Cash" }
] as const;

const PaymentTypeSelector: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { paymentType } = state;

  const handleTypeChange = (newType: string) => {
    if (newType !== paymentType) {
      dispatch({
        type: "SET_PAYMENT_TYPE",
        payload: newType as PaymentType
      });
    }
  };

  return (
    <section>
      <h2 className="mb-4">How Are You Paying?</h2>
      <SegmentedControl 
        value={paymentType} 
        onValueChange={handleTypeChange}
      >
        {paymentOptions.map(option => (
          <SegmentedControlItem key={option.value} value={option.value}>
            <span className="text-xs font-semibold">{option.label}</span>
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
    </section>
  );
};

export default PaymentTypeSelector;
