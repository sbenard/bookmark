import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders default view", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Actuellement aucun bookmark n'a été sauvegardé/i
  );
  expect(linkElement).toBeInTheDocument();
});
