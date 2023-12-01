import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

import {
  aggregateDataByTimeRange,
  determineDateGap,
} from "@/utils/timeRangeUtils";
import { Transactions } from "@/utils/transactions";

import TitleCard from "./TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart({
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
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  const labels = aggregatedData.labels;

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "# of deposits",
        data: aggregatedData.depositData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        fill: true,
        label: "# of withdraws",
        data: aggregatedData.withdrawData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <TitleCard title={"Transactions over time"}>
      {/* @ts-ignore */}
      <Line data={data} options={options} />
    </TitleCard>
  );
}

export default LineChart;
