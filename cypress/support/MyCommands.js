Cypress.Commands.add("Registration", (UserInfo) => {

    // დარწმუნდით რომ მთავარი გვერდი წარმარებით ჩაიტვირთა
    cy.contains("ზოოტოპია").should("be.visible")

    // დააჭირეთ „შესვლას“
    cy.get('.menu-pop > .rprof').click()

    // დარწმუნდით რომ ავტორიზაციის ფანჯარა წარმატებით ჩაიტვირთა
    cy.contains("ავტორიზაცია").should("exist")

    // Pop-up ფანჯარაში უნდა ჩანდეს „გაიარეთ რეგისტრაცია“
    cy.contains("გაიარეთ რეგისტრაცია").should("be.visible")

    // დააჭირეთ "გაიარე რეგისტრაციას"
    cy.get('.input-shablon > p > a').click()

    // შეიყვანეთ უკვე რეგისტრირებული მონაცემები: სახელი, გვარი, ელ. ფოსტა, პირადი ნომერი, ტელეფონი, პაროლი. 
    cy.get(':nth-child(1) > .ismile').type(UserInfo.name)
    cy.get(':nth-child(2) > .imail').type(UserInfo.email)
    cy.get('.ipir').type(UserInfo.personalID)
    cy.get(':nth-child(4) > .itel').type(UserInfo.mobile)
    cy.get(':nth-child(5) > .ipass').type(UserInfo.password)
    cy.get('input[name="reg_password_confirmation"]').type(UserInfo.confirmpassword)

    // დაეთანხმეთ წესებსა და პირობებს
    cy.get('#Rectangle_517').click({ force: true })

    // დააჭირეთ „რეგისტრაციას“
    cy.get('.regsub').click()

})


Cypress.Commands.add("Login", (UserInfo) => {

// დარწმუნდით რომ მთავარი გვერდი წარმარებით ჩაიტვირთა
cy.contains("ზოოტოპია").should("be.visible")

// დააჭირეთ „შესვლას“
cy.get('.menu-pop > .rprof').click()

// დარწმუნდით რომ ავტორიზაციის ფანჯარა წარმატებით ჩაიტვირთა
cy.contains("ავტორიზაცია").should("exist")

// შეიყვანეთ ვალიდური ელ. ფოსტა და გამოტოვეთ პაროლის ჩასაწერი ველი
cy.get(':nth-child(5) > .imail').type(UserInfo.email)

// დააჭირეთ ავტორიზაციას
cy.get('button:contains("ავტორიზაცია")').click()

// დარწმუნდით რომ ავტორიზაცია ვერ მოხერხდა
cy.contains("ავტორიზაცია").should("exist")

})
