describe('Bloglist app', function() {
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

  describe('login tests', function() {
    it('opens login page', function() {
      cy.contains('Bloglist')
      cy.contains('Login')
    })

    it('can log in with existing user', function() {
      cy.get('#username').type('tepi')
      cy.get('#password').type('hupi')
      cy.get('#login-button').click()
      cy.get('#logout-button').click()
    })

    it('can not log in with incorrect credentials', function() {
      cy.get('#username').type('Bob')
      cy.get('#password').type('hack')
      cy.get('#login-button').click()
      cy.get('.error').contains('incorrect username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tepi', password: 'hupi' } )
    })

    it('a new blog can be created', function() {
      cy.get('#toggle-button').click()
      cy.get('#title').type('One blog to rule them all')
      cy.get('#author').type('Sauron')
      cy.get('#url').type('www.mordor.gov')
      cy.get('#submit-button').click()
      cy.contains('One blog to rule them all, Sauron')
      cy.contains('view')
    })

    it('the blog can be liked', function() {

      cy.createBlog({
        title: 'One blog to rule them all',
        author: 'Sauron',
        url: 'wwwm.mordor.gov'
      })

      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.get('#likes').contains('1')
    })

    it.only('can delete a blog it created', function() {
      cy.createBlog({
        title: 'One blog to rule them all',
        author: 'Sauron',
        url: 'wwwm.mordor.gov'
      })

      cy.contains('One blog to rule them all')
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.should('not.contain', 'One blog to rule them all')
    })

  })
})
