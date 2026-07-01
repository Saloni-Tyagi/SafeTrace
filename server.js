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

const complaintRoutes = require("./routes/complaintRoutes");

const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS setup
app.set("view engine", "ejs");

// Routes from authRoutes.js
app.use("/", authRoutes);

app.use("/", complaintRoutes);

app.use("/admin", adminRoutes);

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

// complaint route
app.get("/complaint", (req, res) => {
    res.render("complaint");
});

//  temporary post route
// app.post("/complaint", authMiddleware, (req, res) => {

//     console.log(req.body);

//     res.send("Complaint received");
// });


app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

// Server start
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
