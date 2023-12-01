import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import ArrowUpTrayIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import ReceiptRefundIcon from "@heroicons/react/24/outline/ReceiptRefundIcon";
import { ReactNode } from "react";

import { Totals } from "@/utils/transactionUtils";

import DashboardStats from "./DashboardStats";

type TransactionType = "deposit" | "withdraw" | "pending" | "profit";

interface Summary {
  deposit: number;
  withdraw: number;
  profit: number;
  pending: number;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
interface TransactionTypeUiData<T extends TransactionType> {
  title: string;
  icon: ReactNode;
}

const transactionTypeUiData: Record<
  TransactionType,
  TransactionTypeUiData<TransactionType>
> = {
  deposit: { title: "Deposit", icon: <ArrowDownTrayIcon /> },
  withdraw: { title: "Withdraw", icon: <ArrowUpTrayIcon /> },
  pending: { title: "Pending", icon: <ReceiptRefundIcon /> },
  profit: { title: "Total funds", icon: <CurrencyDollarIcon /> },
};

function DashboardTopCards({
  transactions,
}: {
  transactions: Record<string, Totals>;
}) {
  function calculateSummary(data: Record<string, Totals>): Summary {
    let deposit = 0;
    let withdraw = 0;
    let profit = 0;
    let pending = 0;

    for (const category in data) {
      const categoryData = data[category];
      deposit += categoryData.depositAmount;
      withdraw += categoryData.withdrawAmount;
      profit += categoryData.profit;
      pending += categoryData.pending;
    }

    return { deposit, withdraw, profit, pending };
  }
  return (
    <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
      {Object.entries(calculateSummary(transactions)).map(
        ([type, total], k) => (
          <DashboardStats
            key={k}
            {...transactionTypeUiData[type as TransactionType]}
            value={total}
          />
        )
      )}
    </div>
  );
}

export default DashboardTopCards;
