describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Michael Green',
      username: 'mgreen',
      password: 'HelloSailor'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mgreen')
      cy.get('#password').type('HelloSailor')
      cy.get('#login-button').click()

      cy.should('not.contain', 'Wrong credentials')
      cy.should('not.contain', 'Log in to application')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mgreen')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong credentials')
      cy.contains('Log in to application')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mgreen', password: 'HelloSailor' })
    })

    it('A blog can be created', function() {
      cy.get('#create-form-show').click()
      cy.get('#title').type('test blog title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()

      cy.get('.success').contains('Added new blog: test blog title by test author')
      cy.get('.blog').should('contain', 'test blog title').and('contain', 'test author')
    })

    describe('Interacting with blogs', function() {
      beforeEach(function () {
        const blogs = [
          { title: 'third blog', author: 'third author', url: 'third.com', likes: 1 },
          { title: 'second blog', author: 'second author', url: 'second.com', likes: 2 },
          { title: 'first blog', author: 'first author', url: 'first.com', likes: 3 },
        ]
        blogs.forEach(function(blog) {
          cy.createBlog(blog)
        })
      })

      it('A blog can be liked', function() {
        cy.contains('first blog').as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('like').click()
        cy.get('@blog').contains('likes 4')
      })

      it('A blog can be removed by its creator', function() {
        cy.contains('first blog').parent().as('allBlogs')
        cy.contains('second blog').as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('remove').click()
        cy.get('@allBlogs').should('not.contain', 'second blog')
      })
      
      it('A blogs remove button can only be seen by the creator', function() {
        const user = {
          name: 'Another User',
          username: 'auser',
          password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'auser', password: 'password' })
        
        cy.contains('second blog').as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('remove').parent().should('have.css', 'display', 'none')
      })

      it('Blogs are ordered by number of likes', function() {
        cy.get('.blog').eq(0).should('contain', 'first')
        cy.get('.blog').eq(1).should('contain', 'second')
        cy.get('.blog').eq(2).should('contain', 'third')
        
        cy.contains('second blog').as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('like').click()
        cy.wait(500)
        cy.get('@blog').contains('like').click()

        cy.get('.blog').eq(0).should('contain', 'second')
        cy.get('.blog').eq(1).should('contain', 'first')
        cy.get('.blog').eq(2).should('contain', 'third')
      })
    })
  })
})