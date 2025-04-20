import config from '../config.js';

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header' });
    }

    const authType = authHeader.split(' ')[0];
    if (authType !== 'Basic') {
      return res.status(401).json({ message: 'Invalid authorization type' });
    }

    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (username === config.adminUsername && password === config.adminPassword) {
      next();
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating', error: error.message });
  }
};

export default auth; 