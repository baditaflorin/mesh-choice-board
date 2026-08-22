import { describe, expect, it } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { createMockRoom } from "@baditaflorin/mesh-common/testing";
import { Feature } from "../../src/Feature";
import { config } from "../../src/config";

describe("Feature (component)", () => {
  it("adds and selects a shared choice", () => {
    const room = createMockRoom();
    render(<Feature room={room} config={config} />);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Walk and talk" }));
    });
    expect(screen.getByText("Walk and talk")).toBeInTheDocument();
    const choice = screen.getAllByRole("button", { name: /Walk and talk/ })[0];
    if (!choice) throw new Error("Added choice button is missing");
    act(() => {
      fireEvent.click(choice);
    });
    expect(screen.getByText("1 pick")).toBeInTheDocument();
  });

  it("shows a connecting state when room is null", () => {
    render(<Feature room={null} config={config} />);
    expect(screen.getByRole("heading", { level: 1, name: "Choice Board" })).toBeInTheDocument();
  });
});
