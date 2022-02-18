const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { auth } = require("../middleware/auth");

// Get All users
router.get("/", auth, (req, res) => {
    User.find().exec((err, users) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(users);
    });
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Wrong Credentials");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Wrong Credentials");

    // Login
    const payload = {
        user: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });
    return res.status(200).json({ message: "Successfuly Authenticated", token, role: user.role });
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ status: false, message: "Account Taken" });

        user = new User({ name, email, password, role });
        const token = user.generateToken();
        await user.save();
        return res.status(200).json({ status: true, token, message: "Registration Complete" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Server error, Unable to register",
        });
    }
});

module.exports = router;
