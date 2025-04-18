const config = require('../config');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header' });
  }

  // Basic auth format: "Basic base64(username:password)"
  const authType = authHeader.split(' ')[0];
  if (authType !== 'Basic') {
    return res.status(401).json({ message: 'Invalid authorization type' });
  }

  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString()
    .split(':');
  
  const username = credentials[0];
  const password = credentials[1];

  if (username === config.adminUsername && password === config.adminPassword) {
    next();
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = auth; 