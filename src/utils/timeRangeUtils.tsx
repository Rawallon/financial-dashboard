import { Transactions } from "./transactions";

export function getTimeBetweenDateRange(start: number, end: number) {
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const millisecondsInWeek = 7 * millisecondsInDay;

  const timeDifference = Math.abs(end - start);

  const days = Math.round(timeDifference / millisecondsInDay);
  const weeks = Math.round(timeDifference / millisecondsInWeek);
  const months = Math.round(weeks / 4) + 1;

  return {
    days,
    weeks,
    months,
  };
}

export function determineDateGap(start: number, end: number): string {
  const { days, weeks } = getTimeBetweenDateRange(start, end);

  if (days > 20 && weeks >= 9) {
    return "months";
  } else if (days > 20) {
    return "weeks";
  } else {
    return "days";
  }
}

export function aggregateDataByTimeRange(
  dateRange: string,
  transactions: Transactions,
  dates: { startDate: Date; endDate: Date }
) {
  let aggregatedData: {
    labels: string[];
    depositData: number[];
    withdrawData: number[];
    profitData: number[];
  } = {
    labels: [],
    depositData: [],
    withdrawData: [],
    profitData: [],
  };

  switch (dateRange) {
    case "months": {
      const { months } = getTimeBetweenDateRange(
        dates["startDate"].getTime(),
        dates["endDate"].getTime()
      );
      // Aggregate transactions by month
      const monthlyData = transactions.reduce(
        (acc, transaction) => {
          const transactionDate = new Date(transaction.date);
          const month =
            (transactionDate.getMonth() +
              12 -
              new Date(dates["startDate"]).getMonth()) %
            12;
          const amount = parseFloat(transaction.amount);

          if (transaction.transaction_type === "deposit") {
            acc.depositData[month] += 1;
            acc.profitData[month] += amount;
          } else if (transaction.transaction_type === "withdraw") {
            acc.withdrawData[month] += 1;
            acc.profitData[month] -= amount;
          }

          return acc;
        },
        {
          labels: Array.from({ length: months }, (_, i) => {
            const date = new Date(dates["startDate"]);
            date.setMonth(date.getMonth() + i);
            return date.toLocaleDateString("en-US", { month: "long" });
          }),
          depositData: Array(months).fill(0),
          withdrawData: Array(months).fill(0),
          profitData: Array(months).fill(0),
        }
      );

      aggregatedData = monthlyData;
      break;
    }

    case "weeks": {
      // Aggregate transactions by week
      const weeklyData = transactions.reduce(
        (acc, transaction) => {
          const week = Math.floor(
            (new Date(transaction.date).getTime() - dates.startDate.getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          );
          const amount = parseFloat(transaction.amount);

          if (transaction.transaction_type === "deposit") {
            acc.depositData[week] += 1;
            acc.profitData[week] += amount;
          } else if (transaction.transaction_type === "withdraw") {
            acc.withdrawData[week] += 1;
            acc.profitData[week] -= amount;
          }

          return acc;
        },
        {
          labels: Array.from(
            {
              length: Math.ceil(
                (dates.endDate.getTime() - dates.startDate.getTime()) /
                  (7 * 24 * 60 * 60 * 1000)
              ),
            },
            (_, i) => `Week ${i + 1}`
          ),
          depositData: Array(
            Math.ceil(
              (dates.endDate.getTime() - dates.startDate.getTime()) /
                (7 * 24 * 60 * 60 * 1000)
            )
          ).fill(0),
          withdrawData: Array(
            Math.ceil(
              (dates.endDate.getTime() - dates.startDate.getTime()) /
                (7 * 24 * 60 * 60 * 1000)
            )
          ).fill(0),
          profitData: Array(
            Math.ceil(
              (dates.endDate.getTime() - dates.startDate.getTime()) /
                (7 * 24 * 60 * 60 * 1000)
            )
          ).fill(0),
        }
      );

      aggregatedData = weeklyData;
      break;
    }

    case "days": {
      // Aggregate transactions by day
      const dailyData = transactions.reduce(
        (acc, transaction) => {
          const day = Math.floor(
            (new Date(transaction.date).getTime() - dates.startDate.getTime()) /
              (24 * 60 * 60 * 1000)
          );
          const amount = parseFloat(transaction.amount);

          if (transaction.transaction_type === "deposit") {
            acc.depositData[day] += 1;
            acc.profitData[day] += amount;
          } else if (transaction.transaction_type === "withdraw") {
            acc.withdrawData[day] += 1;
            acc.profitData[day] -= amount;
          }

          return acc;
        },
        {
          labels: Array.from(
            {
              length: Math.ceil(
                (dates.endDate.getTime() - dates.startDate.getTime()) /
                  (24 * 60 * 60 * 1000)
              ),
            },
            (_, i) => {
              const date = new Date(
                dates.startDate.getTime() + i * 24 * 60 * 60 * 1000
              );
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }
          ),
          depositData: Array(
            Math.ceil(
              (dates.endDate.getTime() - dates.startDate.getTime()) /
                (24 * 60 * 60 * 1000)
            )
          ).fill(0),
          withdrawData: Array(
            Math.ceil(
              (dates.endDate.getTime() - dates.startDate.getTime()) /
                (24 * 60 * 60 * 1000)
            )
          ).fill(0),
          profitData: Array(
            Math.ceil(
              (dates.endDate.getTime() - dates.startDate.getTime()) /
                (24 * 60 * 60 * 1000)
            )
          ).fill(0),
        }
      );

      aggregatedData = dailyData;
      break;
    }

    default:
      break;
  }

  return aggregatedData;
}
