const express = require('express');
const { getEmployees } = require('../controllers/employeesController');

const router = express.Router();

router.get('/', getEmployees);

module.exports = router;
