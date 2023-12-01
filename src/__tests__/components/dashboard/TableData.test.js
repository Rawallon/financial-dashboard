import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import TableData from "../../../component/dashboard/TableData";

const transactions = {
  "Oil and Gas Equipment": {
    depositQuantity: 36,
    depositAmount: 196548,
    withdrawQuantity: 49,
    withdrawAmount: 180906,
    profit: 15642,
    percentage: 8.123140199728917,
    pending: 0,
  },
  "Computer Software": {
    depositQuantity: 27,
    depositAmount: 139802,
    withdrawQuantity: 33,
    withdrawAmount: 142398,
    profit: -2596,
    percentage: 0,
    pending: 0,
  },
};
describe("TableData Component", () => {
  test("renders transaction names", () => {
    render(<TableData transactions={transactions} />);

    // Check if transaction names are rendered
    expect(screen.getByText("Oil and Gas Equipment")).toBeInTheDocument();
    expect(screen.getByText("Computer Software")).toBeInTheDocument();
    // Add more expectations for other transaction names
  });

  test("sorts by deposit on initial render", () => {
    render(<TableData transactions={transactions} />);

    // Check initial sorting by deposit
    expect(screen.getByText("# of deposits").classList).not.toContain(
      "text-primary"
    );
    expect(screen.getByText("# of withdraws").classList).not.toContain(
      "text-primary"
    );
    expect(screen.getByText("Profit").classList).toContain("text-primary");
  });

  test("sorts by deposit on header click", () => {
    render(<TableData transactions={transactions} />);

    // Click on the header to trigger sorting
    fireEvent.click(screen.getByText("# of deposits"));

    // Check if sorting is applied
    expect(screen.getByText("# of deposits").classList).toContain(
      "text-primary"
    );
    expect(screen.getByText("# of withdraws").classList).not.toContain(
      "text-primary"
    );
    expect(screen.getByText("Profit").classList).not.toContain("text-primary");
  });

  test("sorts by withdraws on header click", () => {
    render(<TableData transactions={transactions} />);

    // Click on the header to trigger sorting
    fireEvent.click(screen.getByText("# of withdraws"));

    // Check if sorting is applied
    expect(screen.getByText("# of deposits").classList).not.toContain(
      "text-primary"
    );
    expect(screen.getByText("# of withdraws").classList).toContain(
      "text-primary"
    );
    expect(screen.getByText("Profit").classList).not.toContain("text-primary");
  });

  test("sorts by profit on header click", () => {
    render(<TableData transactions={transactions} />);

    // Click on the header to trigger sorting
    fireEvent.click(screen.getByText("# of withdraws"));
    expect(screen.getByText("# of withdraws").classList).toContain(
      "text-primary"
    );

    // Click on the header again
    fireEvent.click(screen.getByText("Profit"));

    // Check if sorting is applied
    expect(screen.getByText("# of deposits").classList).not.toContain(
      "text-primary"
    );
    expect(screen.getByText("# of withdraws").classList).not.toContain(
      "text-primary"
    );
    expect(screen.getByText("Profit").classList).toContain("text-primary");
  });
});
