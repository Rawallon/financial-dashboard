import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardStats from "../../../component/dashboard/DashboardStats";
import formatNumberToFloat from "../../../utils/formatNumberToFloat";

describe("DashboardStats Component", () => {
  test("renders component with title, value, and description", () => {
    const title = "Total Revenue";
    const icon = <span>💰</span>;
    const value = "5000";
    const description = "This is the total revenue";

    const { getByText } = render(
      <DashboardStats
        title={title}
        icon={icon}
        value={value}
        description={description}
      />
    );

    // Check if title, value, and description are rendered
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(value)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
  });

  test("renders component with formated value", () => {
    const title = "Total Orders";
    const value = "10000";

    const { getByText, queryByText } = render(
      <DashboardStats title={title} value={value} />
    );

    // Check if title and value are rendered
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(value)).toBeInTheDocument();

    // Check if description is not rendered
    expect(queryByText("This is the total revenue")).toBeNull();
  });

  test("renders component with title and value only", () => {
    const title = "Total Orders";
    const value = 10000;

    const { getByText, queryByText } = render(
      <DashboardStats title={title} value={value} />
    );

    // Check if title and value are rendered
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(formatNumberToFloat(value))).toBeInTheDocument();

    // Check if description is not rendered
    expect(queryByText("This is the total revenue")).toBeNull();
  });
});
