describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user1= {
      name: 'tin',
      username: 'tinkhu',
      password: 'tinkhu123'
    }
    const user2={
      name:'tin2',
      username: 'tinkhu2',
      password: 'tinkhu1234'
    }

    cy.request('POST', 'http://localhost:3003/api/users/',user1)
    cy.request('POST', 'http://localhost:3003/api/users/',user2)
    cy.visit('http://localhost:5173')
  })

  //5.17

  it('Login form is shown', function() {

    cy.get('#loginForm')

  })

  //5.18
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tinkhu')
      cy.get('#password').type('tinkhu123')
      cy.get('#login-button').click()
      cy.contains('tin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tinkhu')
      cy.get('#password').type('tinkhu122')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password')
    })
  })

  //5.19
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('tinkhu')
      cy.get('#password').type('tinkhu123')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('test_tittle')
      cy.get('#author').type('tester')
      cy.get('#url').type('http:example.com')
      cy.get('#createblog').click()
      cy.contains('a new blog test_tittle by tester added')
      cy.get('.blog').contains('test_tittle tester')
    })
  })

  describe('Blog exists', function() {
    beforeEach(function () {
      cy.get('#username').type('tinkhu')
      cy.get('#password').type('tinkhu123')
      cy.get('#login-button').click()
      cy.contains('create new blog').click()
      cy.get('#title').type('test_tittle')
      cy.get('#author').type('tester')
      cy.get('#url').type('http:example.com')
      cy.get('#createblog').click()
      cy.contains('a new blog test_tittle by tester added')
      cy.get('.blog').contains('test_tittle tester')
    })

    //5.20
    it('A blog can be liked', function() {
      cy.get('#view').click()
      cy.get('#like').click()
      cy.get('#like').click()
      cy.get('.likes').contains('2')
    })

    //5.21
    it('The user who created a blog can delete it' ,function() {
      cy.get('#view').click()
      cy.contains('tin logged in')
      cy.get('#delete').click()
      cy.contains('remove').should('not.exist')
    })
  })

  describe('If more than one user', function() {
    beforeEach(function() {
      cy.get('#username').type('tinkhu2')
      cy.get('#password').type('tinkhu1234')
      cy.get('#login-button').click()

    })

    //5.22
    it('Only user created the blogs can see the remove button', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('test_tittle2')
      cy.get('#author').type('tester2')
      cy.get('#url').type('http:example2.com')
      cy.get('#createblog').click()
      cy.contains('a new blog test_tittle2 by tester2 added')
      cy.get('.blog').contains('test_tittle2 tester2')

      cy.get('#logout').click()
      cy.get('#username').type('tinkhu')
      cy.get('#password').type('tinkhu123')
      cy.get('#login-button').click()
      cy.contains('view').should('not.exist')
      cy.contains('remove').should('not.exist')
    })

    //5.23
    it.only('blogs are ordered by likes', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('The title with most likes')
      cy.get('#author').type('First')
      cy.get('#url').type('https://www.First.com')
      cy.get('#createblog').click({ force: true })

      cy.contains('create new blog').click()
      cy.get('#title').type('The title with the second most likes')
      cy.get('#author').type('Second')
      cy.get('#url').type('https://www.Second.com')
      cy.get('#createblog').click({ force: true })

      cy.contains('The title with most likes').contains('view').click()
      cy.get('button').contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'The title with most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })
  })

})