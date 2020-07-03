// registering/adding users
const express = require('express');
const router = express.Router();

// @route GET api/users
// @desc test route
// @access Public (no webtoken)
router.get('/', (req, res) => res.send('User route'));

module.exports = router;
