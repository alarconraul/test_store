describe('Product Page', () => {
    it('Filtra productos por nombre', () => {
      cy.visit('/')
      cy.get('.column.is-4').should('have.length', 14)
      cy.get('input').type('Casa')
      cy.get('.column.is-4').should('have.length', 1)
    })
    it('Añadir productos al carro', () => {
        cy.visit('/')
        cy.get('.card button.is-pulled-right.is-warning').first().click()
        cy.get('.navbar-burger').click()
        cy.get('span.tag.is-warning').contains('1')
      })
      it('Eliminar productos del carro', () => {
        cy.visit('/')
        cy.get('.card button.is-pulled-right.is-warning').first().click()
        cy.get('.navbar-burger').click()
        cy.get('span.tag.is-warning').click()
        cy.get('.mdi-delete').click()
        cy.get('.modal-card-body').contains('Total: $ 0')
      })
      it('Login', () => {
        cy.visit('/')
        cy.get('.navbar-burger').click()
        cy.get('[meta-test="login"]').click()
        cy.get('.navbar-burger').click()
        cy.get('[meta-test="email"]').type('user1@mystore.com')
        cy.get('[meta-test="password"]').type('password')
        cy.get('[meta-test="acceder"]').click()
        cy.get('.navbar-burger').click()
        cy.get('[meta-test="usuario"]').contains('Usuario')

    })
  })

