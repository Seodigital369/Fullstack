// src/middleware/validate.js
const Joi = require('joi');
const { CustomError } = require('./errorHandler');

module.exports = (schema) => (req, res, next) => {
  const sources = ['body', 'query', 'params'];
  let validationError;

  sources.forEach((source) => {
    if (schema[source]) {
      const { error } = schema[source].validate(req[source], { abortEarly: false });
      if (error) validationError = error;
    }
  });

  if (validationError) {
    const messages = validationError.details.map((detail) => detail.message);
    throw new CustomError(messages.join(', '), 400);
  }

  next();
};