import cy from "cypress";

/* eslint-disable quotes */
describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays the login form by default", () => {
    cy.get("form").should("have.length", 1);
    cy.get("form").should("have.attr", "action", "/login");
    cy.get("form").should("have.attr", "method", "post");

    cy.get('input[type="text"]').should("have.attr", "name", "username");
    cy.get('input[type="password"]').should("have.attr", "name", "password");

    cy.get('button[type="submit"]').should("have.text", "Login");
  });
});

describe("Login", () => {
  beforeEach(() => {
    cy.request("POST", "/api/users", {
      username: "john",
      password: "Password123",
      name: "John May",
    });
  });

  it("succeeds with correct credentials", () => {
    cy.visit("/login");

    cy.get('input[name="username"]').type("john");
    cy.get('input[name="password"]').type("Password123");
    cy.get("form").submit();

    cy.contains("User Logged in successfully");
  });

  it("fails with incorrect credentials", () => {
    cy.visit("/login");

    cy.get('input[name="username"]').type("john-inco");
    cy.get('input[name="password"]').type("Password12345");
    cy.get("form").submit();

    cy.contains("Invalid credential");
  });
});

describe("Logged-in user can create a new blog", () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.visit("/login");
  });

  it("Logs in and creates a new blog", () => {
    cy.get("[name=username]").type("john");
    cy.get("[name=password]").type("Password123");
    cy.get("button").contains("Login").click();
    cy.get("button").contains("Create A Blog").click();

    cy.get("[name=title]").type("My First E2E Test");
    cy.get("[name=author]").type("John May");
    cy.get("[name=url]").type(
      "https://media.istockphoto.com/id/497610338/photo/sunbird-in.com"
    );
    cy.get("[name=likes]").type("200");

    cy.get("button").contains("Add").click();
    cy.contains("My First E2E Test").should("exist");
    cy.contains("John May").should("exist");
  });
});

describe("Liking a blog", () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.visit("/login");
  });
  it("allows a user to like a blog", () => {
    cy.visit("/login");
    cy.get('[name="username"]').type("john");
    cy.get('[name="password"]').type("Password123");
    cy.get('[type="submit"]').click();
    cy.url().should("include", "/blogs");

    cy.contains("My First E2E Test").click();
    cy.contains("0 likes").should("exist");

    cy.get('[data-testid="like-btn"]').click();
    cy.contains("1 likes").should("exist");
  });
});

describe("Delete blog post", () => {
  it("allows user who created a blog to delete it", () => {
    cy.visit("/login");

    cy.get("#username").type("john");
    cy.get("#password").type("Password123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");

    cy.request("POST", "/api/blogs", {
      title: "My Second Blog Post",
      author: "John May",
      url: "https://media.istockphoto.com/id/1369419005/photo/group-of-people-multicolor-peoples-background-teamwork-and-unity-concept.webp?s=612x612&w=is&k=20&c=ezop8V-qLNHfcSXxnnAv5-29MagHb0U2T3PkTlpGYEQ=",
      likes: 0,
    });

    cy.visit("/");
    cy.contains("My Second Blog Post");

    cy.contains("My Second Blog Post").parent().find("button").click();
    cy.contains("Yes").click();

    cy.visit("/");
    cy.contains("My Second Blog Post").should("not.exist");
  });
});

describe("Blog delete button visibility", () => {
  it("should only show delete button to the creator of the blog", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type("john");
    cy.get('input[name="password"]').type("Password123");
    cy.get('button[type="submit"]').click();

    cy.visit("/");

    cy.get(".delete-btn").should("be.visible");

    cy.visit("/logout");

    cy.visit("/login");
    cy.get('input[name="username"]').type("peterzolo");
    cy.get('input[name="password"]').type("Password123");
    cy.get('button[type="submit"]').click();

    cy.visit("/");

    cy.get(".delete-btn").should("not.be.visible");
  });
});
