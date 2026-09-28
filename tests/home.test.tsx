import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Home from "@/app/page";
import { useUIStore } from "@/stores/useUIStore";

describe("Home Page", () => {
  beforeEach(() => {
    useUIStore.setState({ count: 0, sidebarOpen: false, bannerDismissed: false });
  });

  it("renders page title and hero headline", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /production-ready/i })
    ).toBeInTheDocument();
  });

  it("increments the Zustand counter when clicking increment button", () => {
    render(<Home />);

    const counterDisplay = screen.getByTestId("zustand-counter-value");
    expect(counterDisplay).toHaveTextContent("0");

    const incrementButton = screen.getByRole("button", { name: /increment counter/i });
    fireEvent.click(incrementButton);

    expect(screen.getByTestId("zustand-counter-value")).toHaveTextContent("1");
  });

  it("displays validation errors when submitting the feedback form empty", async () => {
    render(<Home />);

    const submitButton = screen.getByRole("button", {
      name: /submit form & trigger toast/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(
        screen.getByText(/please provide a valid email address/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/message must be at least 10 characters/i)
      ).toBeInTheDocument();
    });
  });
});
