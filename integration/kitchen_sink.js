/// <reference types="cypress" />

describe("Cypress Assignment test", function () {
    beforeEach(function () {
       cy.visit("/");
       cy.url().should('eq',"https://example.cypress.io/");
    })

    it('url test',{ browser: 'chrome' } , function() {
        cy.url().should('eq',"https://example.cypress.io/");
    })
    
    it("querying",{ browser: 'firefox' }, function () {
        cy.get(':nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > :nth-child(1)').click();

        cy.url().should('eq',"https://example.cypress.io/commands/querying");
        
        cy.contains('cy.get()').click();
        cy.url().should('eq',"https://docs.cypress.io/api/commands/get")

        cy.visit("https://example.cypress.io/commands/querying")
        cy.contains('cy.contains()').click();
        cy.url().should('eq',"https://docs.cypress.io/api/commands/contains")

        cy.visit("https://example.cypress.io/commands/querying")
        cy.contains('.within()').click();
        cy.url().should('eq',"https://docs.cypress.io/api/commands/within")

        cy.visit("https://example.cypress.io/commands/querying")
        cy.contains('cy.root()').click();
        cy.url().should('eq',"https://docs.cypress.io/api/commands/root")
    })

    it("window",{ browser: '!chrome' }, function(){
        cy.get('.home-list > :nth-child(4) > :nth-child(1)').click();
        cy.url().should('eq',"https://example.cypress.io/commands/window");
        cy.get("a:contains('()')", {timeout:10000}).each((item, index, list) => {
            const values = Cypress._.map(list, 'innerText');
            const uniq = [...new Set(values)];     
            expect(uniq).to.have.length(3);
        })
    })
    
    it("cookie", function (){
        cy.setCookie("token","123456");
        cy.getCookie("token").should("have.property", 'value',"123456")
        cy.clearCookie("token");
        cy.getCookie("token").should("be.null");
    })
})
