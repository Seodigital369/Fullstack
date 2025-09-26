// src/Controllers/employeeController.js
const Employee = require('../models/employeeModel');
const { CustomError } = require('../middleware/errorHandler');

// GET all employees
exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: employees });
  } catch (err) {
    next(err);
  }
};

// GET a single employee by ID
exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });
    if (!employee) throw new CustomError('Employee not found', 404);
    res.status(200).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};

// POST create a new employee - FIXED VERSION
exports.createEmployee = async (req, res, next) => {
  try {
    console.log('📨 Received data:', req.body);
    
    const { name, age, position, salary, hireDate, userId } = req.body;
    
    // Data validation
    if (!name || !age || !position || !salary) {
      throw new CustomError('All fields are required: name, age, position, salary', 400);
    }

    const employee = await Employee.create({
      name: name.trim(),
      age: parseInt(age),
      position: position.trim(),
      salary: parseFloat(salary),
      hireDate: hireDate ? new Date(hireDate) : new Date(),
      userId: userId || undefined,
    });

    console.log('✅ Employee created:', employee);
    
    res.status(201).json({ 
      success: true, 
      message: 'Employee created successfully',
      data: employee 
    });
  } catch (err) {
    console.error('❌ Error creating employee:', err);
    next(err);
  }
};

// PUT update an employee
exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!employee) throw new CustomError('Employee not found', 404);
    res.status(200).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};

// DELETE an employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndDelete({ _id: req.params.id });
    if (!employee) throw new CustomError('Employee not found', 404);
    res.status(200).json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
};