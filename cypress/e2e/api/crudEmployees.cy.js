describe('CRUD (Create|Read|Update|Delete) - Employees', () => {
  const EMPLOYEES_API_URL = `${Cypress.env('API_URL')}/employees`

  beforeEach(() => {
    let employeeId

    cy.request('GET', EMPLOYEES_API_URL)
      .then(({ body, status }) => {
        expect(status).to.eq(200)

        if (body.length > 3) {
          // ATTENTION!
          // Use `===` for the comparison. NEVER use `=`
          // Using `=` would reassign the name of all employees
          // This could lead to deleting the wrong employee just below.
          employeeId = body.find(employee => employee.name === 'John Doe').id
        }

        if (employeeId) {
          cy.request('DELETE', `${EMPLOYEES_API_URL}/${employeeId}`)
            .then(({ status }) => {
             expect(status).to.eq(204)
            })
        }
      })
  })

  it('GET /employees', () => {
    cy.request('GET', EMPLOYEES_API_URL)
      .then(({ body, status }) => {
        expect(status).to.eq(200)
        expect(body.length).to.eq(3)
        body.forEach(employee => {
          expect(employee).to.have.property('id')
          expect(employee).to.have.property('name')
          expect(employee).to.have.property('age')
          expect(employee).to.have.property('designation')
          expect(employee).to.have.property('salary')

          expect(employee.id).to.be.a('number')
          expect(employee.name).to.be.a('string')
          expect(employee.age).to.be.a('number')
          expect(employee.designation).to.be.a('string')
          expect(employee.salary).to.be.a('number')
        })
      })
  })

  it('POST and PUT /employees', () => {
    const newEmployee = require('../../fixtures/employee')
    let employeeId

    cy.request({
      method: 'POST',
      url: EMPLOYEES_API_URL,
      body: newEmployee,
    }).then(({ status, body }) => {
      expect(status).to.eq(201)
      expect(body.name).to.eq(newEmployee.name)
      expect(body.age).to.eq(newEmployee.age)
      expect(body.designation).to.eq(newEmployee.designation)
      expect(body.salary).to.eq(newEmployee.salary)

      employeeId = body.id

      const updatedEmployee = {
        ...newEmployee,
        designation: 'Principal Engineer',
        salary: 28000,
      }

      cy.request({
        method: 'PUT',
        url: `${EMPLOYEES_API_URL}/${employeeId}`,
        body: updatedEmployee,
      }).then(({ status, body }) => {
        expect(status).to.eq(200)
        expect(body.name).to.eq(updatedEmployee.name)
        expect(body.age).to.eq(updatedEmployee.age)
        expect(body.designation).to.eq(updatedEmployee.designation)
        expect(body.salary).to.eq(updatedEmployee.salary)
      })
    })
  })
})
