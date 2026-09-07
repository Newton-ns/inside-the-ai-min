const express = require('express');
const router = express.Router();
const { users } = require('../data/store');

router.post('/login', (req, res) => {
  const { email, role } = req.body;
  let user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  
  if (!user && role) {
    user = users.find(u => u.role === role);
  }
  
  if (!user) {
    user = users[0]; // fallback to inspector
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      designation: user.designation || user.company || "Authorized Officer",
      badgeNumber: user.badgeNumber || null
    },
    token: user.token
  });
});

router.get('/me', (req, res) => {
  res.json({ success: true, user: users[0] });
});

module.exports = router;
