// src/middleware/validateRequest.js
const { CustomError } = require('./errorHandler');

const validateRequest = (rules) => (req, res, next) => {
  const errors = [];

  // Validate body parameters
  if (rules.body) {
    Object.keys(rules.body).forEach(field => {
      const rule = rules.body[field];
      const value = req.body[field];
      
      if (rule.required && (!value && value !== 0)) {
        errors.push(`${field} is required`);
      } else if (value) {
        if (rule.type === 'string' && typeof value !== 'string') {
          errors.push(`${field} must be a string`);
        } else if (rule.type === 'number' && typeof value !== 'number') {
          errors.push(`${field} must be a number`);
        } else if (rule.min && value < rule.min) {
          errors.push(`${field} must be at least ${rule.min}`);
        } else if (rule.max && value > rule.max) {
          errors.push(`${field} cannot exceed ${rule.max}`);
        } else if (rule.minLength && value.length < rule.minLength) {
          errors.push(`${field} must be at least ${rule.minLength} characters`);
        } else if (rule.maxLength && value.length > rule.maxLength) {
          errors.push(`${field} cannot exceed ${rule.maxLength} characters`);
        }
      }
    });
  }

  if (errors.length > 0) {
    throw new CustomError(errors.join(', '), 400);
  }

  next();
};

module.exports = validateRequest;