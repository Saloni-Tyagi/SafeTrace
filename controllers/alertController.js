const Alert = require("../models/Alert");

exports.createAlert = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                success: false,
                message: "Location coordinates are required."
            });
        }

        await Alert.create({ user: req.user.id, latitude, longitude });

        res.json({ success: true, message: "SOS Alert Sent Successfully" });

    } catch (err) {
        console.error("Create alert error:", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.render("alerts", { alerts });
    } catch (err) {
        console.error("Get alerts error:", err.message);
        res.status(500).render("error", {
            message: "Could not load alerts.",
            status: 500
        });
    }
};