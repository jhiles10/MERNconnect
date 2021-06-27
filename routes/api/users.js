const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/user");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    "/",
    [
        // parses the users name input to make sure that it is not an empty value.
        check("name", "Name is required").not().isEmpty(),
        // parses the email input to make sure that it is a valid email format.
        check("email", "Please include a valid email").isEmail(),
        // parses the password input to make sure that it is at least 6 characters long.
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // if there are errors send back a 400 status code as well as the corresponding error message from the above array.
            // error message dependent on the param that the error occurs from.
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, password } = req.body;

        try {
            // See if user exists.
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ message: "User already exists" }] });
            }

            // Get users gravatar
            const avatar = gravatar.url(email, {
                // size
                s: "200",
                // rating
                r: "pg",
                // default
                d: "mm"
            });

            // Create a new user.
            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Encrypt password
            // add generate salt
            const salt = await bcrypt.genSalt(10);
            // Hash password using salt.
            user.password = await bcrypt.hash(password, salt);

            // Save the user
            await user.save();

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                // expiredIn value is in seconds.
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

    }
);

module.exports = router;