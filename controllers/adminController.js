const Complaint = require("../models/Complaint");

exports.dashboard = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("user", "name email");

        res.render("adminDashboard", { complaints });

    } catch (err) {
        console.log(err);
        res.send("Error loading admin dashboard");
    }
};