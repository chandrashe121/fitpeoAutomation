/// <reference types="cypress" />
require('@cypress/xpath')
let totalpatientcount = 560;

describe("Revenue Calculator Functionality", () => {

  it("Verify Recurring Reiumbursement Functionality", () => {

    cy.visit("https://www.fitpeo.com/");
    cy.get('[data-testid="MenuIcon"]').click();
    cy.xpath('//div[text()="Revenue Calculator"]').click({ force: true });
    cy.wait(1500);
    cy.xpath('//input[@type="number"]/preceding::span[1]').scrollIntoView();
    cy.get('.MuiSlider-thumb').click().invoke("attr", "style", "left:41.2%;");
    cy.get('.MuiSlider-thumb').wait(1500).click();

    // Enter 560 patient count
    cy.get('input[type="number"]').clear().type("560");
    cy.xpath('//input[@type="range"]').invoke('val').then((val) => {
      let slidervalue = val;
      cy.log("Stored Slider Value is " + slidervalue)
      expect(slidervalue).equal("560");
    })

    // Click on CPT checkbox
    cy.xpath('//p[text()="CPT-99091"]/following::input[1]').click();

    // Get CPT-99091 value
    cy.get(':nth-child(1) > .MuiFormControlLabel-root > .MuiTypography-root').invoke('text').then((text) => {
      cy.wait(500)
      let cpt99091value = text;
      cy.log("Stored CPT99091 Value is " + cpt99091value);
      cy.wrap(cpt99091value).as('Cpt99091value');
    })
    
     // Click on CPT checkbox
    cy.xpath('//p[text()="CPT-99453"]/following::input[1]').click();

    // Get CPT-99453 value
    cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root').invoke('text').then((text) => {

      let cpt99453value = text;
      cy.log("Stored CPT99453 Value is " + cpt99453value);
      cy.wrap(cpt99453value).as('Cpt99453value');
    })

      // Click on CPT checkbox
    cy.xpath('//p[text()="CPT-99454"]/following::input[1]').click();

    // Get CPT-99454 value
    cy.get(':nth-child(3) > .MuiFormControlLabel-root > .MuiTypography-root').invoke('text').then((text) => {
      let cpt99454value = text;
      cy.log("Stored CPT99454 Value is " + cpt99454value)
      cy.wrap(cpt99454value).as('Cpt99454value');
    })
    
     // Click on CPT checkbox
    cy.xpath('//p[text()="CPT-99474"]/following::input[1]').click();

    // Get CPT-99474 value
    cy.get(':nth-child(8) > .MuiFormControlLabel-root > .MuiTypography-root').invoke('text').then((text) => {
      let cpt99474value = text;
      cy.log("Stored CPT99474 Value is " + cpt99474value)
      cy.wrap(cpt99474value).as('Cpt99474value')
    })

    cy.get('@Cpt99091value').then((cpt99091value) => {
      cy.get('@Cpt99453value').then((cpt99453value) => {
        cy.get('@Cpt99454value').then((cpt99454value) => {
          cy.get('@Cpt99474value').then((cpt99474value) => {

            // Addition of CPTS
            let initialvalue = parseInt(cpt99091value) + parseInt(cpt99453value) + parseInt(cpt99454value) + parseInt(cpt99474value) - parseInt(cpt99453value);
            let finalrecurringreiumbrsmnt = parseInt(totalpatientcount) * parseInt(initialvalue)
            cy.log("Recurring Reiumbrsement  " + finalrecurringreiumbrsmnt)

            //Verify Recurring reiumbrsement amount is displayed
            cy.xpath('//p[text()="Total Recurring Reimbursement for all Patients Per Month"]/following::p[1]').contains(finalrecurringreiumbrsmnt)

          })
        })
      })

    })

  })

})
