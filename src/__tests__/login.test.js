import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import fetch, { Response } from "node-fetch";

import Login from "../app/page";
import fetchMock from "jest-fetch-mock";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      prefetch: () => null,
    };
  },
}));

describe("Login Component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders login form", () => {
    render(<Login />);
    expect(screen.getByText(/Technical Challenge/i)).toBeInTheDocument();
    expect(screen.getByText(/Financial dashboard/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("handles form submission with valid credentials", async () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ message: "Authorized" }),
    });
    fireEvent.submit(loginButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Login/i })).toHaveClass(
        "loading"
      );
    });
  });

  test("handles form submission with invalid credentials", async () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: "invalidUser" } });
    fireEvent.change(passwordInput, { target: { value: "invalidPassword" } });
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ message: "Unauthorized" }),
    });
    fireEvent.submit(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid user/i)).toBeInTheDocument();
    });
  });

  test("handles form submission with without credentials", async () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.submit(loginButton);
    await waitFor(() => {
      expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    });
  });
});
