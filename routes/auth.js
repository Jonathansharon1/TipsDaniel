const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check credentials against config
  if (username === config.adminUsername && password === config.adminPassword) {
    // Generate JWT token
    const token = jwt.sign(
      { username },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router; 