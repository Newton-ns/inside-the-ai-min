const express = require('express');
const router = express.Router();
const { analyticsSummary } = require('../data/store');

router.get('/summary', (req, res) => {
  res.json({
    success: true,
    data: analyticsSummary
  });
});

module.exports = router;
