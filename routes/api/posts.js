//forum to add posts, like, comment, etc.

const express = require('express');
const router = express.Router();

// @route GET api/posts
// @desc test route
// @access Public (no webtoken)
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;