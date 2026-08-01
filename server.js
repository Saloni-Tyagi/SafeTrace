const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();
connectDB();

const cookieParser = require("cookie-parser");

const User = require("./models/User");
const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const alertRoutes = require("./routes/alertRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Security & core middleware
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com", "'unsafe-inline'"],
                fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
                scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
                imgSrc: ["'self'", "data:"]
            }
        }
    })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Rate limit auth routes to slow down brute force attempts
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: "Too many attempts. Please try again later."
});
app.use(["/login", "/register"], authLimiter);

// EJS setup
app.set("view engine", "ejs");

// Routes
app.use("/", authRoutes);
app.use("/", complaintRoutes);
app.use("/", contactRoutes);
app.use("/", alertRoutes);
app.use("/", profileRoutes);
app.use("/admin", adminRoutes);

// Home route
app.get("/", (req, res) => {
    res.render("home");
});

// Protected dashboard
app.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.render("dashboard", { user });
    } catch (err) {
        console.error("Dashboard error:", err.message);
        res.status(500).render("error", {
            message: "Could not load dashboard.",
            status: 500
        });
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

// 404 handler
app.use((req, res) => {
    res.status(404).render("error", {
        message: "Page not found.",
        status: 404
    });
});

// Server start
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port", process.env.PORT || 3000);
});