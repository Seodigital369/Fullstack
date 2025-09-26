const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Age must be at least 18'],
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    maxlength: [50, 'Position cannot exceed 50 characters'],
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative'],
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
  required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamps on save
employeeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;