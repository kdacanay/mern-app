//routes for profiles, fetching, adding, updating

const express = require('express');
const router = express.Router();

// @route GET api/profile
// @desc test route
// @access Public (no webtoken)
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;