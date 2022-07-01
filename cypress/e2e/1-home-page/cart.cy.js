/// <reference types="cypress" />

import path from "path";
const CLIENT_NAME = "John Doe";
const CLIENT_ADDRESS = "John Doe's house";
const GENERATED_BUDGET_NAME = "Orçamento John Doe.pdf";

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

    it("should close the modal if we click in the backdrop (backdrop)", () => {
      cy.get("[data-testid=product-card]").click();
      cy.viewport("iphone-x");

      cy.get("[data-testid=product-card-expanded]").should("exist");

      cy.get("[data-testid=backdrop]").first().click(1, 1, { force: true });

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

  context("create budget", () => {
    before(() => {
      cy.visit("/");

      // cy.get("[data-testid=x-close-expanded-product-card]").click();

      const openSearchWindow = () => {
        cy.get("[data-testid=button-open-search]").click();
      };
      const performSearch = (term) => {
        cy.get("[data-testid=search-input]").type(term);
      };

      openSearchWindow();
      performSearch("gesso");

      cy.get("[data-testid=search-result-item]").first().click();

      openSearchWindow();
      performSearch("gesso");

      cy.get("[data-testid=search-result-item]").eq(1).click();

      openSearchWindow();
      performSearch("gesso");

      cy.get("[data-testid=search-result-item]").eq(2).click();

      openSearchWindow();
      performSearch("gesso");

      cy.get("[data-testid=search-result-item]").eq(3).click();

      openSearchWindow();
      performSearch("g");

      cy.get("body").then(($body) => {
        if ($body.find("[data-testid=search-result-no-price]").length) {
          cy.get("[data-testid=search-result-no-price]").first().click();
        } else {
          cy.get("[data-testid=search-window] [data-testid=backdrop]")
            .first()
            .click(1, 1, { force: true });
        }
      });
    });

    it("should define the price of the product if there's a product without price", () => {
      cy.get("[data-testid=open-budget-modal-bottom]").click();

      cy.get("body").then(($body) => {
        if ($body.find("[data-testid=invalid-product-card]").length) {
          cy.get("[data-testid=budget-modal-bottom-open]").should("not.exist");

          cy.get("[data-testid=invalid-product-card]").click();
          cy.get(
            "[data-testid=invalid-product-card] [data-testid=drag-product-card]"
          ).move({
            deltaX: 0,
            deltaY: 0,
          });

          cy.get("[data-testid=update-price-input] input").click().type(10);
          cy.get("[data-testid=x-close-expanded-product-card]").click();
        }
      });
    });

    it("should open the modal bottom if all products have price", () => {
      cy.get("body").then(($body) => {
        if ($body.find("[data-testid=budget-modal-bottom-closed]").length) {
          cy.get("[data-testid=open-budget-modal-bottom]").click();
        }

        cy.get("[data-testid=budget-modal-bottom-open]").should("exist");
      });
    });

    it("should not submit form if name or address wasn't provided", () => {
      cy.get("[data-testid=budget-modal-bottom-submit-button]").click();

      cy.get("[data-testid=budget-modal-bottom-download-button]").should(
        "not.exist"
      );
    });

    it("should close the modal bottom if we click in the backdrop ", () => {
      cy.get("[data-testid=budget-modal-bottom-open] [data-testid=backdrop]")
        .first()
        .click(1, 1, { force: true });
      cy.get("[data-testid=budget-modal-bottom-open]").should("not.exist");
      cy.get("[data-testid=budget-modal-bottom-closed]").should(
        "not.be.visible"
      );
    });

    it("should close the modal bottom if we drag the modal out of the viewport", () => {
      cy.get("[data-testid=open-budget-modal-bottom]").click();
      cy.get(
        "[data-testid=budget-modal-bottom-open] [data-testid=budget-modal-bottom-open-children]"
      ).move({
        deltaX: 0,
        deltaY: 400,
        force: true,
      });

      cy.get("[data-testid=budget-modal-bottom-open]").should("not.exist");
    });

    it("should start creating the budget if we fill the form and click in the create budget button", () => {
      cy.wait(1000);
      cy.get("[data-testid=open-budget-modal-bottom]").click();

      cy.get("[data-testid=budget-modal-bottom-customer-name]").type(
        CLIENT_NAME
      );
      cy.get("[data-testid=budget-modal-bottom-customer-address]").type(
        CLIENT_ADDRESS
      );
      cy.get("[data-testid=budget-modal-bottom-open] textarea").type(
        "You are a real nice guy, take my money all to you"
      );

      cy.get("[data-testid=budget-modal-bottom-submit-button]").click();
      cy.get("[data-testid=budget-modal-bottom-download-button]").should(
        "exist"
      );
    });

    it("should share a pdf if we click in the share budget button", () => {
      cy.wait(1000);
      cy.get("[data-testid=budget-modal-bottom-download-button]").click();
      cy.wait(1000);
      const downloadsFolder = Cypress.config("downloadsFolder");
      cy.readFile(path.join(downloadsFolder, GENERATED_BUDGET_NAME)).should(
        "exist"
      );
    });
  });
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
