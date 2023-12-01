import { SelectablePropertiesType } from "@/utils/types";

import { Transactions } from "./transactions";

export interface Totals {
  depositAmount: number;
  depositQuantity: number;
  withdrawAmount: number;
  withdrawQuantity: number;
  profit: number;
  percentage: number;
  pending: number;
}

export interface FilterOptions {
  withdraw?: { min?: number | null; max?: number | null };
  deposit?: { min?: number | null; max?: number | null };
  profit?: { min?: number | null; max?: number | null };
  amount?: { min?: number | null; max?: number | null };
}

function removeDecimalFromMonetaryValue(
  monetaryValue: string | number | undefined | null
) {
  if (typeof monetaryValue === "number") {
    monetaryValue = String(monetaryValue.toFixed(2));
  } else if (typeof monetaryValue !== "string") {
    monetaryValue = String(monetaryValue);
  }

  // Remove non-numeric characters and convert to an integer
  const intValue = parseInt(monetaryValue.replace(/[^\d]/g, ""), 10);

  // Check if the conversion is successful and return the result
  return isNaN(intValue) ? null : intValue;
}

export default function calculateTotalByProperty(
  transactions: Transactions,
  groupBy: SelectablePropertiesType,
  filters: FilterOptions = {}
) {
  const totalByProperty: Record<string, Totals> = {};
  const minAmount = removeDecimalFromMonetaryValue(filters.amount?.min);
  const maxAmount = removeDecimalFromMonetaryValue(filters.amount?.max);
  const dueDate = Date.now();

  transactions.forEach((transaction) => {
    const { transaction_type, amount, date } = transaction;
    const amountValue = parseFloat(amount);
    if (!isNaN(amountValue)) {
      const propertyValue = transaction[groupBy];

      // Apply filter for transaction amount
      if (
        (minAmount && amountValue < minAmount) ||
        (maxAmount && amountValue > maxAmount)
      ) {
        return;
      }

      if (!totalByProperty[propertyValue]) {
        totalByProperty[propertyValue] = {
          depositQuantity: 0,
          depositAmount: 0,
          withdrawQuantity: 0,
          withdrawAmount: 0,
          profit: 0,
          percentage: 0,
          pending: 0,
        };
      }

      if (!totalByProperty[propertyValue].pending)
        totalByProperty[propertyValue].pending = 0;
      if (date > dueDate) {
        totalByProperty[propertyValue].pending += amountValue;
      }
      if (!totalByProperty[propertyValue][`${transaction_type}Amount`])
        totalByProperty[propertyValue][`${transaction_type}Amount`] = 0;
      totalByProperty[propertyValue][`${transaction_type}Amount`] +=
        amountValue;
      totalByProperty[propertyValue][`${transaction_type}Quantity`]++;
      totalByProperty[propertyValue].profit +=
        transaction_type === "deposit" ? amountValue : -amountValue;
    }
  });
  // Calculate total profit across all groups
  const totalProfit = Object.values(totalByProperty).reduce((acc, totals) => {
    return acc + Math.max(0, totals.profit); // Consider only positive profits
  }, 0);

  // Calculate percentage for each group based on positive profits
  Object.values(totalByProperty).forEach((totals) => {
    totals.percentage =
      totalProfit !== 0 ? (Math.max(0, totals.profit) / totalProfit) * 100 : 0;
  });

  // Apply additional filters after calculating totals
  Object.keys(totalByProperty).forEach((propertyValue) => {
    const totals = totalByProperty[propertyValue];

    if (
      (filters.deposit?.min && totals.depositQuantity < filters.deposit.min) ||
      (filters.deposit?.max && totals.depositQuantity > filters.deposit.max)
    ) {
      delete totalByProperty[propertyValue];
      return;
    }

    if (
      (filters.profit?.min && totals.profit < filters.profit.min) ||
      (filters.profit?.max && totals.profit > filters.profit.max)
    ) {
      delete totalByProperty[propertyValue];
      return;
    }

    if (
      (filters.withdraw?.min &&
        totals.withdrawQuantity < filters.withdraw.min) ||
      (filters.withdraw?.max && totals.withdrawQuantity > filters.withdraw.max)
    ) {
      delete totalByProperty[propertyValue];
      return;
    }
  });

  return totalByProperty;
}
