const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Show Register Page
exports.getRegisterPage = (req, res) => {
    res.render("register");
};

// Show Login Page
exports.getLoginPage = (req, res) => {
    res.render("login");
};

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("User already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.send("User Registered Successfully");

    } catch (err) {
        console.log(err);
        res.send("Registration Failed");
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User not found");
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.send("Invalid Credentials");
        }

        // Create JWT Token
        console.log("Login user email:", user.email);
        console.log("isAdmin from database:", user.isAdmin);

        // Create JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Save token in cookie
        res.cookie("token", token, {
            httpOnly: true
        });

        // Redirect to dashboard
        res.redirect("/dashboard");

    } catch (err) {
        console.log(err);
        res.send("Login Failed");
    }
};