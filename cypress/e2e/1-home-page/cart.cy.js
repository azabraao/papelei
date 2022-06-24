/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("cart", () => {
  context("with the cart empty", () => {
    before(() => {
      cy.viewport("iphone-5");
      cy.visit("/");
    });

    it("displays a empty cart message when page loads", () => {
      cy.get("[data-testid=empty-cart]").should("exist");
    });

    it("should open the search when search input clicked", () => {
      cy.get("[data-testid=button-open-search]").click();

      cy.wait(200);

      cy.get("[data-testid=search-window]").should("exist");
    });

    it("should add items to the cart", () => {
      const openSearchWindow = () => {
        cy.get("[data-testid=button-open-search]").click();
      };
      const performSearch = () => {
        cy.get("[data-testid=search-input]").type("gesso");
      };

      performSearch();
      cy.wait(200);

      cy.get("[data-testid=search-result-item]")
        .first()
        .find("[data-testid=search-result-item-name]")
        .then(($div) => {
          const itemName = $div.text();

          cy.get("[data-testid=search-result-item]").first().click();

          cy.wait(200);

          cy.get("[data-testid=product-card]")
            .first()
            .should("contain", itemName);
        });

      openSearchWindow();
      performSearch();
      cy.wait(200);

      cy.get("[data-testid=search-result-item]")
        .eq(1)
        .find("[data-testid=search-result-item-name]")
        .then(($div) => {
          const itemName = $div.text();

          cy.get("[data-testid=search-result-item]").eq(1).click();

          cy.wait(1000);

          cy.get("[data-testid=product-card]")
            .eq(1)
            .should("contain", itemName);
        });

      openSearchWindow();
      performSearch();
      cy.wait(200);

      cy.get("[data-testid=search-result-item]")
        .eq(2)
        .find("[data-testid=search-result-item-name]")
        .then(($div) => {
          const itemName = $div.text();

          cy.get("[data-testid=search-result-item]").eq(2).click();

          cy.wait(1000);

          cy.get("[data-testid=product-card]")
            .eq(2)
            .should("contain", itemName);
        });

      cy.get("[data-testid=product-card]").should("have.length", 3);
    });
  });

  context("when there are items in the cart", () => {
    beforeEach(() => {
      cy.viewport("iphone-5");
    });

    it("should have 3 added items in cart", () => {
      cy.get("[data-testid=product-card]").should("have.length", 3);
    });

    it("should have a scroll if the cart overflows", () => {
      cy.get("[data-testid=cart-scroll]").then(($div) => {
        const scrollWidth = $div.prop("scrollWidth");
        const clientWidth = $div.prop("clientWidth");

        expect(scrollWidth).to.be.greaterThan(clientWidth);
      });
    });

    it("should remove a item from cart if we drag a cart item up", () => {
      cy.get("[data-testid=product-card]").should("have.length", 3);

      cy.get("[data-testid=drag-product-card]")
        .first()
        .move({ deltaX: 0, deltaY: -200 });

      cy.get("[data-testid=product-card]").should("have.length", 2);
    });

    it("should change the product card total value if I change the product quantity", () => {
      cy.get("[data-testid=product-card-total-price]")
        .first()
        .then(($div) => {
          const productPrice = $div.text();

          cy.get("[data-testid=increase-button]").first().click();

          cy.get("[data-testid=product-card-total-price]")
            .first()
            .then(($div) => {
              const cartTotalPrice = $div.text();

              expect(cartTotalPrice).to.not.equal(productPrice);
            });
        });
    });

    it("should change the cart total value if I change a product quantity", () => {
      //https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Closures
      cy.get("[data-testid=increase-button]").each(($button) => {
        cy.get("[data-testid=budget-total-value]").then(($div) => {
          const oldValue = $div.text();
          $button.trigger("click");

          cy.get("[data-testid=budget-total-value]").should(($div) => {
            const newValue = $div.text();

            expect(newValue).to.not.equal(oldValue);
          });
        });
      });
    });

    it("should decrease the cart total value if I remove a product", () => {
      cy.get("[data-testid=budget-total-value]").then(($div) => {
        const oldValue = $div.text();

        cy.get("[data-testid=drag-product-card]")
          .first()
          .move({ deltaX: 0, deltaY: -200 });

        cy.get("[data-testid=budget-total-value]").should(($div) => {
          const newValue = $div.text();

          expect(newValue).to.not.equal(oldValue);
        });
      });
    });

    it("should increase budget value total on new product added", () => {
      cy.get("[data-testid=button-open-search]").scrollIntoView();
      cy.get("[data-testid=button-open-search]").click();
      cy.get("[data-testid=search-input]").type("gesso");

      cy.get("[data-testid=budget-total-value]").then(($div) => {
        const oldValue = $div.text();

        cy.get("[data-testid=search-result-item]").eq(3).click();

        cy.get("[data-testid=budget-total-value]").should(($div) => {
          const newValue = $div.text();

          expect(newValue).to.not.equal(oldValue);
        });
      });
    });

    it("should open a modal when we click on the cart item", () => {
      cy.get("[data-testid=product-card]")
        .first()
        .then(() => {
          cy.get("[data-testid=product-card]").first().click();

          cy.get("[data-testid=product-card-expanded]").should("exist");
        });
    });

    it(" should remove the item from the cart if we click in the modal remove button and confirm the deletion", () => {
      cy.get("[data-testid=button-remove-product-from-cart]").dblclick();

      cy.get("[data-testid=product-card-expanded]").should("not.exist");
    });
  });

  // TODO:

  //
  // updates in a product shouldn't affect other products
  // modal testing:
  //
  // should not remove the item from the cart if we click in the modal remove button and close the modal without confirming the deletion
  // should close the modal if we click in the portal (backdrop)
  // should close the modal if we click in the X icon
  // should close the modal if we drag the modal out of the viewport
  // should change the product value if we change the quantity
  // should change the product value if update the price in the money input
});
