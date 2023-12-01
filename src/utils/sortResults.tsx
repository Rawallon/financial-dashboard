import { sorteablePropertiesType } from "@/component/dashboard/PropertyChart";

import { Totals } from "./transactionUtils";

interface sortedTotals extends Totals {
  key: string;
}

export default function sortResults(
  totals: Record<string, Totals>,
  sortBy: sorteablePropertiesType
): sortedTotals[] {
  const sortedResults: sortedTotals[] = Object.entries(totals).map(
    ([key, value]) => ({ key, ...value })
  );

  sortedResults.sort((a, b) => {
    switch (sortBy) {
      case "deposit":
        return b.depositQuantity - a.depositQuantity;
      case "withdraw":
        return b.withdrawQuantity - a.withdrawQuantity;
      case "profit":
        return b.profit - a.profit;
      default:
        throw new Error("Invalid sort order");
    }
  });
  return sortedResults;
}
