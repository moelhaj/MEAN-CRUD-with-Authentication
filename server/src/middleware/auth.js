const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ status: false, message: "Access denied" });
    }
};
