import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
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

describe("AddBlog component", () => {
  test("renders blog's URL and number of likes when button is clicked", () => {
    const blog = {
      title: "Digital marketing",
      author: "Peter SAolomon",
      url: "https://media.istockphoto.com/id/497610338/photo/sunbird-in-africa.jpg?s=612x612&w=0&k=20&c=trU_aFl8BO-oEmE5WprxgMoanAXUv6xEq5_RklHhsUc=",
      likes: 5,
      user: {
        name: "peterzolo",
      },
    };

    const component = render(<AddBlog blog={blog} />);

    const button = component.getByText("Show details");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(`Likes ${blog.likes}`);
  });
});

describe("AddBlog", () => {
  test("calls submit handler twice when submit button is clicked twice", () => {
    const mockSubmitHandler = jest.fn();
    const { getByText } = render(<AddBlog onSubmit={mockSubmitHandler} />);

    const submitButton = getByText("Add");

    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(mockSubmitHandler).toHaveBeenCalledTimes(2);
  });
});

describe("AddBlog", () => {
  test("calls event handler with the right details when a new blog is created", () => {
    const createBlogMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AddBlog onCreateBlog={createBlogMock} />
    );

    const titleInput = getByPlaceholderText("Add title here ....");
    const urlInput = getByPlaceholderText("Add Url here ....");
    const addButton = getByText("Add");

    fireEvent.change(titleInput, {
      target: { value: "Digital Marketing Business" },
    });
    fireEvent.change(urlInput, {
      target: {
        value:
          "https://media.istockphoto.com/id/497610338/photo/sunbird-in-africa.j.com",
      },
    });
    fireEvent.click(addButton);

    expect(createBlogMock).toHaveBeenCalledWith({
      title: "Digital Marketing Business",
      url: "https://media.istockphoto.com/id/497610338/photo/sunbird-in-africa.j.com",
    });
  });
});

describe("AddBlog component", () => {
  test("calls handleSubmit function with correct input values when a new blog is created", async () => {
    const handleSubmit = jest.fn();
    render(<AddBlog onSubmit={handleSubmit} />);

    const titleInput = screen.getByPlaceholderText(
      "https://media.istockphoto.com/id/497610338/photo/sunbird-in-africa.j.com"
    );
    const urlInput = screen.getByPlaceholderText(
      "https://media.istockphoto.com/id/497610338/photo/sunbird-in-africa.j.com"
    );
    const addButton = screen.getByRole("button", { name: "Add" });

    fireEvent.change(titleInput, {
      target: { value: "Digital Marketing Business" },
    });
    fireEvent.change(urlInput, {
      target: {
        value:
          "https://media.istockphoto.com/id/497610338/photo/sunbird-in-africa.j.com",
      },
    });
    fireEvent.click(addButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      title: "Digital Marketing Business",
      url: "https://media.istockphoto.com/id/497610338/photo/sunbird-in-africa.j.com",
    });
  });
});
