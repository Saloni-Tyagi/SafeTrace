const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Show Register Page
exports.getRegisterPage = (req, res) => {
    res.render("register", { error: null });
};

// Show Login Page
exports.getLoginPage = (req, res) => {
    res.render("login", { error: null });
};

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render("register", {
                error: "All fields are required."
            });
        }

        if (password.length < 6) {
            return res.status(400).render("register", {
                error: "Password must be at least 6 characters."
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(409).render("register", {
                error: "An account with this email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.redirect("/login");

    } catch (err) {
        console.error("Registration error:", err.message);
        res.status(500).render("register", {
            error: "Something went wrong. Please try again."
        });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("login", {
                error: "Email and password are required."
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).render("login", {
                error: "Invalid email or password."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).render("login", {
                error: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.redirect("/dashboard");

    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).render("login", {
            error: "Something went wrong. Please try again."
        });
    }
};