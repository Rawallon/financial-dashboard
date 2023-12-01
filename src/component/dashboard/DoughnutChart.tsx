import {
  ArcElement,
  Chart as ChartJS,
  Filler,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { Totals } from "@/utils/transactionUtils";

import TitleCard from "./TitleCard";

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);

function DoughnutChart({
  transactions,
}: {
  transactions: Record<string, Totals>;
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = Object.keys(transactions);

  const data = {
    labels,
    datasets: [
      {
        label: "% of profit",
        data: Object.values(transactions).map((t) => t.percentage),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <TitleCard title={"Percentage of transactions by group"}>
      {/* @ts-ignore */}
      <Doughnut options={options} data={data} />
    </TitleCard>
  );
}

export default DoughnutChart;
