import UserInfo from "../fixtures/SignupInfo.json"

describe('template spec', () => {
  it('Test case 003 - უკვე რეგისტრირებული მონაცემებით ახალი ანგარიშის რეგისტრაციის შემოწმება', () => {
    cy.visit('/')

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

    // დარწმუნდით რომ სისტემამ დააფიქსირა რომ ბაზაში უკვე არსებობს მონაცემები
    cy.contains("ასეთი ჩანაწერი უკვე არსებობს").should("exist")

  })

  it('passes', () => {
    cy.visit('/')
    cy.Registration(UserInfo)

  })
})



describe('template spec', () => {
  it('Test case 008 - სწორი მეილით, პაროლის გარეშე ავტორიზაციის შემოწმება', () => {
    cy.visit('/')

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

  it('passes', () => {
    cy.visit('/')
    cy.Login(UserInfo)

  })
})


describe('template spec', () => {
  it('Test case 013 - პროდუქტის კალათაში დამატების შემოწმება ანგარიშის შექმნის გარეშე', () => {
    cy.visit('/')

    // დარწმუნდით რომ მთავარი გვერდი წარმარებით ჩაიტვირთა
    cy.contains("ზოოტოპია").should("be.visible")

    // დარწმუნდით რომ ანგარიშზე არ ხართ შესული
    cy.get('.menu-pop > .rprof').should("exist")

    // გადადით პროდუქციის გვერდზე
    cy.contains("პროდუქციის ნახვა").should("exist")
    cy.get('.pug > .seepro').click()

    // დააჭირეთ პროდუქტის სურათის დაბლა არსებულ კალათის აიქონს
    cy.get('div[data-id="1537"]').click()

    // დარწმუნდით რომ პროდუქტი წარმატებით დაემატა კალათაში
    cy.get('.menu-pop > a:nth-child(4)').click()
    cy.get('.cart-item').should("exist")

  })
})


describe('template spec', () => {
  it('Test case 014 - შევამოწმოთ იცვლება თუ არა რაოდენობა +-ზე დაჭერისას', () => {
    cy.visit('/')

    // გადადით პროდუქციის გვერდზე
    cy.contains("პროდუქციის ნახვა").should("exist")
    cy.get('.pug > .seepro').click()

    // დააჭირეთ პროდუქტის სურათის დაბლა არსებულ კალათის აიქონს
    cy.get('div[data-id="1537"]').click()

    // გადადით კალათაში და დარწმუნდით რომ პროდუქტი წარმატებით არის დამატებული
    cy.get('.menu-pop > a:nth-child(4)').click()
    cy.get('.cart-item').should("exist")

    // დააჭირეთ პროდუქტის ფანჯარაში არსებულ +-ს 
    cy.get('.plus').click()

    // დარწმუნდით რომ რაოდენობა გაიზარდა
    cy.get('.spinner').should('exist')
    cy.get('.spinner > input').should('not.be.a', '1')

  })
})


describe('template spec', () => {
  it('Test case 018 - პროდუქტის ყიდვის/თანხის გადახდის მცდელობა ავტორიზაციის გარეშე', () => {
    cy.visit('/')

    // გადადით პროდუქციის გვერდზე
    cy.contains("პროდუქციის ნახვა").should("exist")
    cy.get('.pug > .seepro').click()

    // დააჭირეთ პროდუქტის სურათის დაბლა არსებულ კალათის აიქონს
    cy.get('div[data-id="1537"]').click()

    // გადადით კალათაში და დარწმუნდით რომ პროდუქტი წარმატებით არის დამატებული
    cy.get('.menu-pop > a:nth-child(4)').click()
    cy.get('.cart-item').should("exist")

    // შეიყვანეთ ქალაქი/მისამართი
    cy.get('.nice-select').click({ multiple: true });
    cy.contains("თბილისი").should("exist").click({force: true})
    cy.get('.location').type("მისამართი")

    // მონიშნეთ ონლაინ გადახდა (ან დარწმუნდით რომ უკვე მონიშნულია)
    cy.get('[for="gadaxda"]').click()

    // დააჭირეთ გადახდას
    cy.get('.cart-submit').click()

    // დარწმუნდით რომ სისტემა არ გაძლევთ ავტორიზაციის გარეშე ყიდვის საშუალებას
    cy.get('.avtorization > .input-shablon').should("be.visible")
    cy.contains("ავტორიზაცია").should("exist")


  })
})

