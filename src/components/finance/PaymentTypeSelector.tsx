
import React, { useEffect, useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { PaymentType } from "../../types/financeTypes";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

const paymentTabs = [
  {
    value: "dealer",
    label: "Dealer",
    description: "Dealer financing may offer special rates",
  },
  {
    value: "outside",
    label: "Outside Loan",
    description: "Outside loans often have competitive rates",
  },
  {
    value: "cash",
    label: "Cash",
    description: "Cash payment simplifies the process",
  },
] as const;

const PaymentTypeSelector: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { paymentType } = state;
  const [animationDelay, setAnimationDelay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDelay(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Tab change handler
  const handleTabChange = (newType: string) => {
    if (newType !== paymentType) {
      dispatch({ type: "SET_PAYMENT_TYPE", payload: newType as PaymentType });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-6 text-[#1EAEDB]">How Are You Paying?</h2>
      <Tabs
        value={paymentType}
        onValueChange={handleTabChange}
        className="w-full"
        data-testid="PaymentTabs"
      >
        <TabsList className="w-full grid grid-cols-3 mb-6 bg-[#F5F7F9] p-1 rounded-lg">
          {paymentTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`
                py-3 px-4 rounded-md text-sm font-medium transition-all duration-200
                ${paymentType === tab.value
                  ? "bg-white text-[#1EAEDB] shadow-sm"
                  : "text-[#555] hover:bg-[#E9F6FB]/50"
                }
                ${animationDelay ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
              `}
              style={{
                transitionDelay: `${animationDelay ? 90 : 0}ms`,
              }}
              aria-label={tab.label}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {paymentTabs.map((tab) => (
          <TabsContent 
            value={tab.value} 
            key={tab.value} 
            className="text-sm text-[#555] bg-[#F5F7F9]/50 p-3 rounded-md"
          >
            {tab.description}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PaymentTypeSelector;
