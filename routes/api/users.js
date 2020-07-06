// registering/adding users
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');
// @route POST api/users
// @desc register user route
// @access Public (no webtoken)
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a value email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
  async (req, res) => {
    // req.body (object of data from request)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // see if user exists
    // get users gravatar (based on email)
    // encrypt password w/bcrypt
    //return jsonwebtoken (to get logged in right away)

    //destructure req.body
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      //save user to database
      await user.save();

      //return jsob webtoken
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  });

module.exports = router;
