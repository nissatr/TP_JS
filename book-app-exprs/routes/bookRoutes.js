const express = require('express');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Protected route
router.get('/', auth, (req, res) => {
  res.json([
    { title: 'The Pragmatic Programmer' },
    { title: 'Clean Code' },
    { title: 'You Don’t Know JS' }
  ]);
});

module.exports = router;
