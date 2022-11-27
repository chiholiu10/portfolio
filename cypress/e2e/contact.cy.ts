describe("renders the one pager", () => {
  it("renders contact component correctly", () => {
    cy.visit("/");
    cy.get("#contact").should("exist");
  });

  it("renders section banner component correctly", () => {
    cy.visit("/");
    cy.get("#banner").should("exist");
  });

  it("renders section experience component correctly", () => {
    cy.visit("/");
    cy.get("#experience").should("exist");
  });

  it("renders section footer component correctly", () => {
    cy.visit("/");
    cy.get("#footer").should("exist");
  });

  it("renders section introduction component correctly", () => {
    cy.visit("/");
    cy.get("#introduction").should("exist");
  });
});

export {};
