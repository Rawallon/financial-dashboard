import {
  determineDateGap,
  getTimeBetweenDateRange,
} from "../../utils/timeRangeUtils";

describe("getTimeBetweenDateRange", () => {
  it("should calculate time between two dates in days, weeks, and months", () => {
    const startDateTimestamp = new Date("2023-01-01").getTime();
    const endDate = new Date("2023-01-01");
    endDate.setDate(endDate.getDate() + 45);
    const endDateTimestamp = endDate.getTime();

    const result = getTimeBetweenDateRange(
      startDateTimestamp,
      endDateTimestamp
    );

    expect(result.days).toBe(45);
    expect(result.weeks).toBe(6);
    expect(result.months).toBe(3);
  });
});

describe("determineDateGap", () => {
  it("should determine date gap in months for a long duration", () => {
    const startDate = new Date("2023-01-01").getTime();
    const endDate = new Date("2023-10-01").getTime();

    const result = determineDateGap(startDate, endDate);

    expect(result).toBe("months");
  });

  it("should determine date gap in weeks for a moderate duration", () => {
    const startDate = new Date("2023-01-01").getTime();
    const endDate = new Date("2023-01-25").getTime();

    const result = determineDateGap(startDate, endDate);

    expect(result).toBe("weeks");
  });

  it("should determine date gap in days for a short duration", () => {
    const startDate = new Date("2023-01-01").getTime();
    const endDate = new Date("2023-01-05").getTime();

    const result = determineDateGap(startDate, endDate);

    expect(result).toBe("days");
  });

  // Add more test cases as needed for different date ranges
});
