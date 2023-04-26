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
