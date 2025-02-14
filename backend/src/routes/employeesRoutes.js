const express = require('express');
const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeesController');

const router = express.Router();

router.get('/', getEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
