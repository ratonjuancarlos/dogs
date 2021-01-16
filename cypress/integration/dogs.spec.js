/// <reference types="cypress" />

context("Dogs", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Should add 2 dogs to my team and remove 1 dog from my team", () => {
    cy.get('a[data-test="dog-link"]').then((links) => {
      const $link = links[Math.floor(Math.random() * links.length)];
      const perro = cy.get($link).invoke("attr", "data-dog");
      console.log(perro);

      cy.get($link).click();
    });

    cy.get('button[data-test="save-dog"]').click();
    cy.get('a[data-test="my-team"]').click();
    cy.get('a[data-test="home"]').click();

    cy.get('a[data-test="dog-link"]').then((links) => {
      const $link = links[Math.floor(Math.random() * links.length)];
      cy.get($link).click();
    });
    cy.get('button[data-test="save-dog"]').click();
    cy.get('a[data-test="my-team"]').click();

    let dogsInMyTeam = 0;
    cy.get('div[data-test="dog-in-team"]').then((dogs) => {
      expect(dogs.length).is.equal(2);
      dogsInMyTeam = dogs.length;
    });

    cy.get('button[data-test="remove-dog"]').then((buttons) => {
      cy.log(dogsInMyTeam);
      const $button = buttons[Math.floor(Math.random() * buttons.length)];

      cy.get($button).click();
    });

    cy.get('div[data-test="dog-in-team"]').then((dogs) =>
      expect(dogs.length).is.equal(dogsInMyTeam - 1)
    );
  });
});
