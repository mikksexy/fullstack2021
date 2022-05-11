/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('virheellinen')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password') 
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('salainen')
      cy.get('#author').type('kirjailija')
      cy.get('#url').type('jee.com')
      cy.get('#create-button').click()

      cy.contains('salainen')
      cy.contains('kirjailija')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('salainen')
      cy.get('#author').type('kirjailija')
      cy.get('#url').type('jee.com')
      cy.get('#create-button').click()

      cy.contains('view').click()
      cy.contains('likes')
      cy.contains('like').click()
      cy.contains('likes 1')
    })
  })
})