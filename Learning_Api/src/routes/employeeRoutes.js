// src/routes/employeeRoutes.js
const express = require('express');
const { 
  getEmployees, 
  getEmployeeById, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
} = require('../Controllers/employeeController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

const createEmployeeRules = {
  body: {
    name: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    age: { type: 'number', required: true, min: 18 },
    position: { type: 'string', required: true, maxLength: 50 },
    salary: { type: 'number', required: true, min: 0 },
    hireDate: { type: 'string', required: false },
    userId: { type: 'string', required: false },
  },
};

const updateEmployeeRules = {
  body: {
    name: { type: 'string', required: false, minLength: 2, maxLength: 100 },
    age: { type: 'number', required: false, min: 18 },
    position: { type: 'string', required: false, maxLength: 50 },
    salary: { type: 'number', required: false, min: 0 },
    hireDate: { type: 'string', required: false },
    userId: { type: 'string', required: false },
  },
};

router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/', validateRequest(createEmployeeRules), createEmployee);
router.put('/:id', validateRequest(updateEmployeeRules), updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;