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

      cy.get("[data-testid=search-result-item]")
        .first()
        .find("[data-testid=search-result-item-name]")
        .then(($div) => {
          const itemName = $div.text();

          cy.get("[data-testid=search-result-item]").first().click();

          cy.get("[data-testid=product-card]")
            .first()
            .should("contain", itemName);
        });

      openSearchWindow();
      performSearch();

      cy.get("[data-testid=search-result-item]")
        .eq(1)
        .find("[data-testid=search-result-item-name]")
        .then(($div) => {
          const itemName = $div.text();

          cy.get("[data-testid=search-result-item]").eq(1).click();

          cy.get("[data-testid=product-card]")
            .eq(1)
            .should("contain", itemName);
        });

      openSearchWindow();
      performSearch();

      cy.get("[data-testid=search-result-item]")
        .eq(2)
        .find("[data-testid=search-result-item-name]")
        .then(($div) => {
          const itemName = $div.text();

          cy.get("[data-testid=search-result-item]").eq(2).click();

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
      cy.get("[data-testid=product-card]").first().click();

      cy.get("[data-testid=product-card-expanded]").should("exist");
    });

    it(" should remove the item from the cart if we click in the modal remove button and confirm the deletion", () => {
      cy.get("[data-testid=product-card-name]")
        .first()
        .then(($div) => {
          const productName = $div.text();

          cy.get("[data-testid=drag-product-card]")
            .first()
            .move({ deltaX: 0, deltaY: 0 });
          cy.get("[data-testid=button-remove-product]").click();
          cy.get("[data-testid=button-remove-product]").click();

          cy.get("[data-testid=product-card-expanded]").should("not.exist");

          cy.get("[data-testid=product-card-name]")
            .first()
            .then(($div) => {
              const otherProductName = $div.text();

              expect(productName).to.not.equal(otherProductName);
            });
        });
    });

    it("should not remove the item from the cart from modal without user confirmation", () => {
      cy.get("[data-testid=product-card-name]")
        .first()
        .then(($div) => {
          const productName = $div.text();
          cy.get("[data-testid=product-card]").click();

          cy.get("[data-testid=drag-product-card]")
            .first()
            .move({ deltaX: 0, deltaY: 0 });
          cy.get("[data-testid=button-remove-product]").click();
          cy.get("[data-testid=x-close-expanded-product-card]").click();

          cy.get("[data-testid=product-card-expanded]").should("not.exist");

          cy.get("[data-testid=product-card-name]")
            .first()
            .then(($div) => {
              const otherProductName = $div.text();

              expect(productName).to.equal(otherProductName);
            });
        });
    });

    it("should close the modal if we click in the portal (backdrop)", () => {
      cy.get("[data-testid=product-card]").click();
      cy.viewport("iphone-x");

      cy.get("[data-testid=product-card-expanded]").should("exist");

      cy.get("[data-testid=portal]").click(1, 1, { force: true });

      cy.get("[data-testid=product-card-expanded]").should("not.exist");
    });

    it("should close the modal if we click in the X icon", () => {
      cy.get("[data-testid=product-card]").click();

      cy.get("[data-testid=product-card-expanded]").should("exist");

      cy.get("[data-testid=x-close-expanded-product-card]").click();

      cy.get("[data-testid=product-card-expanded]").should("not.exist");
    });

    it("should close the modal if we drag the modal out of the viewport", () => {
      cy.get("[data-testid=product-card]").click();

      cy.wait(1000);

      cy.get("[data-testid=drag-product-card]")
        .first()
        .move({ deltaX: 0, deltaY: -100 });
      cy.get("[data-testid=product-card-expanded]").should("not.exist");
    });

    it("should change the product value if update the price in the money input", () => {
      cy.get("[data-testid=product-card]").click();

      cy.get("[data-testid=product-card-total-price]")
        .first()
        .then(($div) => {
          const productTotalPrice = $div.text();
          cy.get("[data-testid=drag-product-card]")
            .first()
            .move({ deltaX: 0, deltaY: 0 });
          cy.get("[data-testid=update-price-input] input").click().type(10);

          cy.get("[data-testid=product-card-total-price]")
            .first()
            .then(($div) => {
              const updatedProductPrice = $div.text();
              expect(productTotalPrice).not.to.equal(updatedProductPrice);
            });
        });
    });
  });

  // TODO:

  //
});

// const simularCompra = ({
//   precoProvedor,
//   precoUnitarioAVista,
//   quantidade
// }) => {
//   const precoDeVenda = precoUnitarioAVista * 1.05;

//   const totalParcelado = precoDeVenda * quantidade;

//   const precoGildasio = precoProvedor * quantidade;

//   const totalAVista = totalParcelado * 0.9;

//   return {
//       parcelado: {
//           total: numberToMoney(totalParcelado),
//           lucro: numberToMoney(totalParcelado * 0.95 - precoGildasio)
//       },
//       precoGildasio: numberToMoney(precoGildasio),
//       aVista: {
//           total: numberToMoney(totalAVista),
//           lucro: numberToMoney(totalAVista - precoGildasio)
//       },
//   }
// }
