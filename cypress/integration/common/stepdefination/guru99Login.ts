/// <reference types="Cypress"/>
import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { WatchDirectoryFlags } from "typescript";

const userName = "cypresstest@gmail.com";
const password = "cypress@123";
var id;

// Navigate to Guru99 Website
Given("Navigate to guru99 website", () => {
  cy.visit("https://demo.guru99.com/insurance/v1/index.php");
});

//Login failure
Then("User loggin with non-registered user", () => {
  cy.get("input[name='email']").type("cypress55");
  cy.get("#password").type("cypress@55");
  cy.get("input[name='submit']").click();
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});

//Verify user login failed
Then("Verify the login should failure", () => {
  let loginFaliedMsg = "Enter your Email address and password correct";
  cy.get("b").should("have.text", loginFaliedMsg);
  console.log("Verified failed error message");
});

//Register new user
And("Register new user", () => {
  //   cy.get(".btn .btn-default").click();
  cy.get(".btn-default").should("be.visible").its("length").should("be.eq", 2);
  cy.get('a[href*="register.php"]').click();
  cy.get("#user_firstname").type("CypressTest");
  cy.get("#user_surname").type("Test");
  cy.get("#user_phone").type("1234567890");
  cy.get("#user_address_attributes_street").type("Cypress.io");
  cy.get("#user_address_attributes_city").type("Bangalore");
  cy.get("#user_address_attributes_county").type("India");
  cy.get("#user_address_attributes_postcode").type("560097");
  cy.get("#user_user_detail_attributes_email").type(userName);
  cy.get("#user_user_detail_attributes_password").type(password);
  cy.get("#user_user_detail_attributes_password_confirmation").type(password);
  cy.get("input[name='submit']").type("cypress@123");
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});

//User logged with registered user
When("User logged with registered user", () => {
  cy.get("input[name='email']").type(userName);
  cy.get("#password").type(password);
  cy.get("input[name='submit']").click();
});

//Verify loggedin success with username
And("Verify loggedin success with username", () => {
  cy.get("h4").should("have.text", userName);
  console.log("Verified after login, loggedin user-name");
});

//Request the user Quotation
Then("Request the user Quotation", () => {
  cy.get('a[href*="#tabs-2"]').click();
  cy.get("#quotation_vehicle_attributes_registration").type("KA05MD5555");
  cy.get("#quotation_vehicle_attributes_mileage").type("18");
  cy.get("#quotation_vehicle_attributes_value").type("1500000");
  cy.get("#quotation_vehicle_attributes_parkinglocation")
    .select(6)
    .invoke("val")
    .should("eq", "Unlocked garage");
  cy.get("#quotation_vehicle_attributes_policystart_1i")
    .select(9)
    .invoke("val")
    .should("eq", "2023");
  cy.get("#quotation_vehicle_attributes_policystart_2i")
    .select(0)
    .invoke("val")
    .should("eq", "1");
  cy.get("#quotation_vehicle_attributes_policystart_3i")
    .select(19)
    .invoke("val")
    .should("eq", "20");
  cy.get("input[name='submit']").click();

  //   cy.get('app-screen').find('input[id="studentName"]').invoke('val').as('name')
  // cy.get('@name').then((name) => {
  //   cy.log('Student Name: ' + name) //prints name
  // })
});

//Retrieve the user Quotation
Then("Retrieve the user Quotation", () => {
  cy.go("back");
  cy.get('a[href*="#tabs-3"]').click();
  cy.get("#getquote").click();
  cy.go("back");
});

//Click on User-Profile
And("Click on User-Profile", () => {
  cy.get("#profile").click();
});

//Click on Edit-Profile
And("Click on Edit-Profile", () => {
  cy.get("#editprofile").click();
  //user update detailes
  cy.get("#user_surname").type("User01");
  cy.get("#user_firstname").type("User01_Cypress");
  cy.get("#user_phone").type("1234567890");
  cy.get("#user_dateofbirth_1i").select(6).invoke("val").should("eq", "1941");
  cy.get("#user_dateofbirth_2i").select(0).invoke("val").should("eq", "1");
  cy.get("#user_dateofbirth_3i").select(6).invoke("val").should("eq", "7");
  cy.get("#user_address_attributes_street").type("YellahanakaNewTown");
  cy.get("#user_address_attributes_city").type("Bangalore");
  cy.get("#user_address_attributes_county").type("India");
  cy.get("#user_address_attributes_postcode").type("560098");
  cy.get("input[name='commit']").click();
});

//Logout the user
Then("Logout the user", () => {
  //   cy.get("input").click();

  cy.wait(5000);
  cy.get("input[type=submit]").should("be.visible").click({ multiple: true });
  cy.wait(5000);
});
