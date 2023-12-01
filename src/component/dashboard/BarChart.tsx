import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import {
  aggregateDataByTimeRange,
  determineDateGap,
} from "@/utils/timeRangeUtils";
import { Transactions } from "@/utils/transactions";

import TitleCard from "./TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({
  dates,
  transactions,
}: {
  dates: { startDate: Date; endDate: Date };
  transactions: Transactions;
}) {
  const dateRange = determineDateGap(
    dates.startDate.getTime(),
    dates.endDate.getTime()
  );
  const aggregatedData = aggregateDataByTimeRange(
    dateRange,
    transactions,
    dates
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = aggregatedData["labels"];

  const data = {
    labels,
    datasets: [
      {
        label: "Profit in $",
        data: aggregatedData["profitData"],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <TitleCard title={"Revenue"}>
      {/* @ts-ignore */}
      <Bar id="bar-chart" options={options} data={data} />
    </TitleCard>
  );
}

export default BarChart;
