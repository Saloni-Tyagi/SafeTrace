const User = require("../models/User");

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).render("error", {
                message: "User not found.",
                status: 404
            });
        }

        res.render("profile", { user });

    } catch (err) {
        console.error("Get profile error:", err.message);
        res.status(500).render("error", {
            message: "Could not load profile.",
            status: 500
        });
    }
};