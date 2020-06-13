describe('Form Testing', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza");
      });
    it("Form Input Testing", () => {
        cy.get("input[id=name]")
            .type("Angel")
            .should("have.value", "Angel")
        cy.get("input[name=onion]")
            .click()
        cy.get("input[name=sausage]")
            .click()
        cy.get("button[type=submit]")
            .click()
    })
})
