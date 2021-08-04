const express = require("express");
const router = express.Router();
const Profile = require("../../models/profile");
const User = require("../../models/user");
// add this (auth) to any routes we want to protect as second parameter.
const auth = require("../../middleware/auth");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user." });
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;