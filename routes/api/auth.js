//handles getting a json webtoken for authentication

const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc test route
// @access Public (no webtoken)
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;