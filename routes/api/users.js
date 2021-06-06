const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // if there are errors send back a 400 status code as well as the corresponding error message from the above array.
            // error message dependent on the param that the error occurs from.
            return res.status(400).json({ errors: errors.array() })
        }
        res.send("User route")
    }
);

module.exports = router;