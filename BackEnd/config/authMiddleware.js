const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const logger = require('./logger');
require('dotenv').config();

const auth = (req, res, next) => {
  const tokenCookie = req.headers.authorization || req.headers.cookie && cookie.parse(req.headers.cookie).token;
 
  if (!tokenCookie) {
    logger.error('Access denied. No token provided.');
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  // const token = tokenCookie.replace('Bearer', '');

  jwt.verify(tokenCookie, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      logger.error('Invalid token.');
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
    req.userId = decoded.userId;

    logger.info('User authenticated successfully.');
    next();
  });
};

module.exports = auth;