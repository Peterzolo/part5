import React from "react";
import { render, screen } from "@testing-library/react";
import AddBlog from "./AddBlog";

describe("AddBlog", () => {
  it("renders the title and author, but not the URL or likes by default", () => {
    render(<AddBlog />);

    expect(screen.getByPlaceholderText(/add title here/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/add url here/i)).toBeInTheDocument();

    expect(
      screen.queryByPlaceholderText(/add url here/i)
    ).not.toBeInTheDocument();

    expect(screen.queryByText(/likes/i)).not.toBeInTheDocument();
  });
});
