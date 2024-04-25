import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../page";
import { Suspense } from "react";

describe("Page", () => {
  it("renders a heading", async () => {
    render(await Page({ params: { query: "backend" } }));

    const heading = screen.getByRole("heading", { level: 1, name: "테스트1" });

    expect(heading).toBeInTheDocument();
  });
});
