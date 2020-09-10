const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// model
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
    '/',
    [
        // validation check
        check('name', 'Please add name').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        // if bad request; invalid response
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // get data from body
        const { name, email, password } = req.body;

        try {
            // check to see if the user already exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            // create instance of the user
            user = new User({
                name,
                email,
                password
            });

            // encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // save user to db
            await user.save();

            // create jwt
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
