const jwt = require('jsonwebtoken');
const { CustomError } = require('./errorHandler');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) throw new CustomError('No token provided', 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new CustomError('Invalid token', 401);
  }
};