
import React, { useEffect, useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { PaymentType } from "../../types/financeTypes";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

const paymentTabs = [
  {
    value: "dealer",
    label: "Dealer",
    icon: "💳",
    description: "Dealer financing may offer special rates",
  },
  {
    value: "outside",
    label: "Outside Loan",
    icon: "👛",
    description: "Outside loans often have competitive rates",
  },
  {
    value: "cash",
    label: "Cash",
    icon: "🏷️",
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
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-[#1EAEDB]">How Are You Paying?</h2>
      <Tabs
        value={paymentType}
        onValueChange={handleTabChange}
        className="w-full"
        data-testid="PaymentTabs"
      >
        <TabsList className="w-full gap-2">
          {paymentTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`
                flex-1 flex flex-col items-center gap-1 rounded-xl text-base font-semibold cursor-pointer border-2
                ${paymentType === tab.value
                  ? "bg-[#1EAEDB] text-white border-[#1EAEDB] scale-105 shadow"
                  : "bg-[#F5F7F9] text-[#222] border-[#E6E8EB] hover:bg-[#E9F6FB]"
                }
                py-4 transition-all duration-300
                ${animationDelay ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
              `}
              style={{
                transitionDelay: `${animationDelay ? 90 : 0}ms`,
              }}
              aria-label={tab.label}
            >
              <span className="mb-1 text-2xl">{tab.icon}</span>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {paymentTabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.value} className="pt-4 text-sm">
            <span className="text-[#1EAEDB] flex items-center">{tab.description}</span>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PaymentTypeSelector;
