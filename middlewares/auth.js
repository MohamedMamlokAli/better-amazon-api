const JWT = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/index');
const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { id: payload.id, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
