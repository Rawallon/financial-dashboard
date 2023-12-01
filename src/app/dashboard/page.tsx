"use client";

import { useEffect, useState } from "react";

import BarChart from "@/component/dashboard/BarChart";
import DashboardTopBar from "@/component/dashboard/DashboardTopBar";
import DashboardTopCards from "@/component/dashboard/DashboardTopCards";
import DoughnutChart from "@/component/dashboard/DoughnutChart";
import LineChart from "@/component/dashboard/LineChart";
import TableData from "@/component/dashboard/TableData";
import LeftSidebar from "@/component/LeftSidebar";
import useLocalStorage from "@/hooks/useLocalStorage";
import useDebounce from "@/utils/debounce";
import { Transactions } from "@/utils/transactions";
import transactionsJSON from "@/utils/transactions.json";
import calculateTotal, { Totals } from "@/utils/transactionUtils";
import { SelectablePropertiesType } from "@/utils/types";

const transactionsData = transactionsJSON as Transactions;
export type FilterProperties<T> = {
  group: SelectablePropertiesType;
  withdraw: T;
  deposit: T;
  profit: T;
  amount: T;
};

const INITIAL_FILTER_PROPERTIES = {
  group: "industry" as SelectablePropertiesType,
  withdraw: { min: null, max: null },
  deposit: { min: null, max: null },
  profit: { min: null, max: null },
  amount: { min: null, max: null },
};

function Dashboard() {
  const [storedFilterProperties, setStoredFilterProperties] = useLocalStorage(
    "filterProperties",
    INITIAL_FILTER_PROPERTIES
  );
  const getOneWeekAgo = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    return oneWeekAgo;
  };
  const [storedDates, setDates] = useLocalStorage("selectedDates", {
    startDate: getOneWeekAgo(),
    endDate: new Date(),
  });

  const [filterProperties, setFilterProperties] = useState<
    FilterProperties<{ min: null; max: null }>
  >(storedFilterProperties);
  const debouncedFilterProperties = useDebounce(filterProperties);

  const [dashboardPeriod, setDashboardPeriod] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(storedDates["startDate"]),
    endDate: new Date(storedDates["endDate"]),
  });

  const debouncedDateSelection = useDebounce(dashboardPeriod);

  const [transactionsDateFiltered, setTransactionsDateFiltered] =
    useState<Transactions>(
      transactionsData.filter(
        (transactions) =>
          transactions.date > dashboardPeriod["startDate"].getTime() &&
          transactions.date < dashboardPeriod["endDate"].getTime()
      )
    );
  const [transactions, setTransactions] = useState<Record<string, Totals>>({});

  useEffect(() => {
    if (debouncedFilterProperties) {
      setTransactions(
        calculateTotal(
          transactionsDateFiltered,
          filterProperties["group"],
          filterProperties
        )
      );
      setStoredFilterProperties(filterProperties);
    }
    if (debouncedDateSelection) {
      const dateFiltered = transactionsData.filter(
        (transactions) =>
          transactions.date > dashboardPeriod["startDate"].getTime() &&
          transactions.date < dashboardPeriod["endDate"].getTime()
      );
      setDates({
        startDate: dashboardPeriod["startDate"],
        endDate: dashboardPeriod["endDate"],
      });
      setTransactionsDateFiltered(dateFiltered);
      setTransactions(
        calculateTotal(
          dateFiltered,
          filterProperties["group"],
          filterProperties
        )
      );
    }
  }, [debouncedFilterProperties, debouncedDateSelection]);

  return (
    <div className="drawer ">
      <input
        id="left-sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col">
        <div className="w-full sticky top-0 left-0 z-[1] navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="left-sidebar-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="ml-auto">
            <DashboardTopBar
              dashboardPeriod={dashboardPeriod}
              updateDashboardPeriod={setDashboardPeriod}
              filterProperties={filterProperties}
              setFilterProperties={setFilterProperties}
            />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto pt-8 px-6  bg-base-200">
            <DashboardTopCards transactions={transactions} />

            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
              <LineChart
                dates={dashboardPeriod}
                transactions={transactionsDateFiltered}
              />
              <BarChart
                dates={dashboardPeriod}
                transactions={transactionsDateFiltered}
              />
            </div>

            <div className="divider"></div>

            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
              <TableData transactions={transactions} />
              <DoughnutChart transactions={transactions} />
            </div>
        </main>
      </div>
      <LeftSidebar />
    </div>
  );
}

export default Dashboard;
