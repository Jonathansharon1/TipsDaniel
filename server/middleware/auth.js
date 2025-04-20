import config from '../config.js';

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header' });
    }

    const [authType, credentials] = authHeader.split(' ');
    
    if (authType !== 'Basic') {
      return res.status(401).json({ message: 'Invalid authorization type' });
    }

    const [username, password] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':');

    if (username !== config.adminUsername || password !== config.adminPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(500).json({ message: 'Authentication error' });
  }
};

export default auth; 