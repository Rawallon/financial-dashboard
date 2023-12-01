import { useState } from "react";

import sortResults from "@/utils/sortResults";
import { Totals } from "@/utils/transactionUtils";
import { sorteablePropertiesType } from "@/utils/types";

import TitleCard from "./TitleCard";

function TableData({ transactions }: { transactions: Record<string, Totals> }) {
  const [sortedBy, setSortedBy] = useState<sorteablePropertiesType>("profit");

  return (
    <TitleCard title={"Transaction metrics by group"}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Source</th>
              <th
                className={`normal-case cursor-pointer transition hover:text-primary ${
                  sortedBy == "deposit" ? "text-primary" : ""
                }`}
                onClick={() => {
                  setSortedBy("deposit");
                }}
              >
                # of deposits
              </th>
              <th
                className={`normal-case cursor-pointer transition hover:text-primary ${
                  sortedBy == "withdraw" ? "text-primary" : ""
                }`}
                onClick={() => {
                  setSortedBy("withdraw");
                }}
              >
                # of withdraws
              </th>
              <th
                className={`normal-case cursor-pointer transition hover:text-primary ${
                  sortedBy == "profit" ? "text-primary" : ""
                }`}
                onClick={() => {
                  setSortedBy("profit");
                }}
              >
                Profit
              </th>
            </tr>
          </thead>
          <tbody>
            {sortResults(transactions, sortedBy).map(
              ({ key, depositQuantity, withdrawQuantity, profit }, k) => (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{key}</td>
                  <td>{depositQuantity}</td>
                  <td>{withdrawQuantity}</td>
                  <td>{profit}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default TableData;
