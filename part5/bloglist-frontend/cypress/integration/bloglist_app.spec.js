describe('Bloglist app', function() {
  // lue tämä osio materiaalista ensin
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'tepi',
      password: 'hupi',
      name: 'TestiTeppo'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  describe('Login'), function ()  {
    it('opens login page', function() {
      cy.contains('Bloglist')
      cy.contains('Login')
    })

    it('can not log in with incorrect credentials', function() {
      cy.get('#username').type('Bob')
      cy.get('#password').type('hack')
      cy.get('#login-button').click()
      cy.get('.error').contains('incorrect username or password')
    })

    it('can log in with existing user', function() {
      cy.get('#username').type('tepi')
      cy.get('#password').type('hupi')
      cy.get('#login-button').click()
    })
  }

  
})