import { ReactNode } from "react";

import convertNumberToFloat from "@/utils/formatNumberToFloat";

interface DashboardStatsProps {
  title: string;
  icon?: ReactNode;
  value?: number | string;
  description?: string;
  colorIndex?: number;
}

function DashboardStats({
  title,
  icon,
  value,
  description,
}: DashboardStatsProps) {
  let parsedValue = value;
  if (typeof value === "number") {
    parsedValue = convertNumberToFloat(value)
  }

  return (
    <div className="stats bg-base-100 shadow">
      <div className="stat overflow-hidden	">
        <div className="stat-figure bg-base-300 xl:p-2 lg:hidden xl:block sm:p-2 lg:p-1 rounded-md xl:w-12 sm:w-12 w-8">
          {icon}
        </div>
        <div className="stat-title">{title}</div>
        <div className="stat-value font-normal text-2xl md:text-1xl 2xl:text-4xl">
          {parsedValue}
        </div>
        {description && <div className="stat-desc">{description}</div>}
      </div>
    </div>
  );
}

export default DashboardStats;
