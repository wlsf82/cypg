describe('Database Testing with PostgreSQL', () => {
  beforeEach(() => {
    cy.task('queryDatabase', {
      query: 'DELETE FROM employee_data WHERE name=$1',
      values: ['John Doe']
    }).then(() => {
      cy.log('John Doe was deleted from the database')
    })

    cy.task('queryDatabase', {
      query: 'SELECT * FROM employee_data WHERE name = $1',
      values: ['John Doe']
    }).then(result => {
      expect(result).to.have.length(0)
    })

    cy.intercept('GET', '**/api/employees').as('getEmployees')
  })

  it('selects employee data', () => {
    cy.task('queryDatabase', {
      query: 'SELECT * FROM employee_data WHERE name = $1',
      values: ['Alice Johnson']
    }).then(result => {
      expect(result).to.have.length(1)
      expect(result[0].name).to.equal('Alice Johnson')
      expect(result[0].age).to.equal(38)
      expect(result[0].designation).to.equal('CEO')
      expect(result[0].salary).to.equal(50000)

      cy.visit('/')

      cy.wait('@getEmployees')

      cy.contains('table tbody tr td', result[0].name).should('be.visible')
      cy.contains('table tbody tr td', result[0].age).should('be.visible')
      cy.contains('table tbody tr td', result[0].designation).should('be.visible')
      cy.contains('table tbody tr td', result[0].salary).should('be.visible')
    })
  })

  it('inserts and updates an employee', () => {
    cy.task('queryDatabase', {
      query: 'INSERT INTO employee_data(name, age, designation, salary) VALUES ($1, $2, $3, $4) RETURNING *',
      values: ['John Doe', 45, 'Senior Engineer', 20000]
    }).then(result => {
      expect(result).to.have.length(1)
      expect(result[0].name).to.equal('John Doe')
      expect(result[0].age).to.equal(45)
      expect(result[0].designation).to.equal('Senior Engineer')
      expect(result[0].salary).to.equal(20000)

      cy.visit('/')

      cy.wait('@getEmployees')

      cy.contains('table tbody tr td', result[0].name).should('be.visible')
      cy.contains('table tbody tr td', result[0].age).should('be.visible')
      cy.contains('table tbody tr td', result[0].designation).should('be.visible')
      cy.contains('table tbody tr td', result[0].salary).should('be.visible')
    })

    cy.task('queryDatabase', {
      query: 'UPDATE employee_data SET designation = $1, salary = $2 WHERE name = $3 RETURNING *',
      values: ['Principal Engineer', 28000, 'John Doe']
    }).then(result => {
      expect(result).to.have.length(1)
      expect(result[0].name).to.equal('John Doe')
      expect(result[0].age).to.equal(45)
      expect(result[0].designation).to.equal('Principal Engineer')
      expect(result[0].salary).to.equal(28000)

      cy.visit('/')

      cy.wait('@getEmployees')

      cy.contains('table tbody tr td', result[0].name).should('be.visible')
      cy.contains('table tbody tr td', result[0].age).should('be.visible')
      cy.contains('table tbody tr td', result[0].designation).should('be.visible')
      cy.contains('table tbody tr td', result[0].salary).should('be.visible')
    })
  })
})
