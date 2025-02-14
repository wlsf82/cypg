const { query } = require('../db');

const getEmployees = async (req, res) => {
  try {
    const result = await query('SELECT id, name, age, designation, salary FROM employee_data;');
    res.json(result);
  } catch (err) {
    console.error('Error retrieving employee data', err);
    res.status(500).send('Server error');
  }
};

const createEmployee = async (req, res) => {
  const { name, age, designation, salary } = req.body;
  try {
    const result = await query(
      'INSERT INTO employee_data (name, age, designation, salary) VALUES ($1, $2, $3, $4) RETURNING *;',
      [name, age, designation, salary]
    );
    res.status(201).json(result[0]);
  } catch (err) {
    console.error('Error creating employee', err);
    res.status(500).send('Server error');
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, age, designation, salary } = req.body;
  try {
    const result = await query(
      'UPDATE employee_data SET name = $1, age = $2, designation = $3, salary = $4 WHERE id = $5 RETURNING *;',
      [name, age, designation, salary, id]
    );
    res.json(result[0]);
  } catch (err) {
    console.error('Error updating employee', err);
    res.status(500).send('Server error');
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM employee_data WHERE id = $1;', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting employee', err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
