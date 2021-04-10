import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";

describe("renders default view", () => {
  it("should display an empty result", () => {
    render(<App />);
    const linkElement = screen.getByText(
      /Actuellement aucun bookmark n'a été sauvegardé/i
    );
    expect(linkElement).toBeInTheDocument();
  });

  it("Disable submit btn when there is no url", () => {
    const utils = render(<App />);

    const input = utils.getByTestId("url-input");
    const submitBtn = utils.getByTestId("submit-button");
    fireEvent.change(input, {
      target: {
        value: "",
      },
    });

    expect(submitBtn).toBeDisabled();
    fireEvent.change(input, {
      target: {
        value:
          "https://www.flickr.com/photos/felicefelines/51103482334/in/explore-2021-04-09/",
      },
    });
    expect(submitBtn).not.toBeDisabled();
  });
});
