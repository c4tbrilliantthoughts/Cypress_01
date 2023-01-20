Feature: Visit demo.guru99.com to validate the Quotation to a registered Insurance customer
    Scenario: Validate the Quotation to a registered Insurance customer
        Given Navigate to guru99 website
        When User loggin with non-registered user
        Then Verify the login should failure
        And Register new user
        When User logged with registered user
        And Verify loggedin success with username
        Then Request the user Quotation
        Then Retrieve the user Quotation
        And Click on User-Profile
        And Click on Edit-Profile
        Then Logout the user

