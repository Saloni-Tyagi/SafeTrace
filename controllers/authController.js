const User = require("../models/User");

exports.getRegisterPage = (req, res) => {
    res.render("register");
};

exports.getLoginPage = (req, res) => {
    res.render("login");
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.send("User Registered Successfully");
    } catch (err) {
        console.log(err);
        res.send("Registration Failed");
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.send("Invalid Credentials");
        }

        res.send("Login Successful");
    } catch (err) {
        console.log(err);
        res.send("Login Failed");
    }
};