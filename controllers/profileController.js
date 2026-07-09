const User = require("../models/User");

exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        res.render("profile", {
            user
        });

    } catch (err) {

        console.log(err);

        res.send("Server Error");

    }

};