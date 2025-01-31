const { query } = require('../db');

const getEmployees = async (req, res) => {
  try {
    const result = await query('SELECT name, age, designation, salary FROM employee_data;');
    res.json(result);
  } catch (err) {
    console.error('Error retrieving employee data', err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getEmployees,
};
