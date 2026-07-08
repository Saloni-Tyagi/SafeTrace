const Alert = require("../models/Alert");

// Save SOS Alert
exports.createAlert = async (req, res) => {

    try {

        const { latitude, longitude } = req.body;

        await Alert.create({
            user: req.user.id,
            latitude,
            longitude
        });

        res.json({
            success: true,
            message: "SOS Alert Sent Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// Alert History
exports.getAlerts = async (req, res) => {

    try {

        const alerts = await Alert.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.render("alerts", { alerts });

    } catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }
};