const express = require("express");

const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const authMiddleware = require("./middleware/authMiddleware");


const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS setup
app.set("view engine", "ejs");

// Routes from authRoutes.js
app.use("/", authRoutes);

// Home route
app.get("/", (req, res) => {
    res.render("home");
});

// register route
app.get("/register", (req, res) => {
    res.render("register");
});

// protected dashboard
app.get("/dashboard", authMiddleware, (req, res) => {
    res.render("dashboard");
});


// register user
app.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // 1. check if user exists (IMPORTANT)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send("User already exists");
        }

        // 2. hash password (THIS is Step 3)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. save user with hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.send("User Registered Successfully");

    } catch (error) {

        console.log(error);

        res.send("Registration Failed");
    }

});

app.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send("Invalid credentials");
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        res.send("Login error");
    }
});

app.get("/dashboard", authMiddleware, (req, res) => {
    res.render("dashboard");
});

// complaint route
app.get("/complaint", authMiddleware, (req, res) => {
    res.render("complaint");
});

//  temporary post route
app.post("/complaint", authMiddleware, (req, res) => {

    console.log(req.body);

    res.send("Complaint received");
});


app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

// Server start
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
