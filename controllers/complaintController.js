const Complaint = require("../models/Complaint");

exports.submitComplaint = async (req, res) => {
    console.log("===== Complaint Request =====");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    try {
        const { vehicleNumber, category, description } = req.body;

        await Complaint.create({
            user: req.user.id,
            vehicleNumber,
            category,
            description
        });

        res.redirect("/dashboard");

    } catch (err) {
        console.error("===== COMPLAINT ERROR =====");
        console.error(err);

        res.status(500).send(err.message);
    }
};

exports.getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            user: req.user.id
        });

        res.render("myComplaints", {
            complaints
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("user", "name email");

        res.render("adminDashboard", {
            complaints
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};