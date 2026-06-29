const Complaint = require("../models/Complaint");

exports.submitComplaint = async (req, res) => {
    try {
        const {
            title,
            description,
            location,
            vehicleNumber
        } = req.body;

        await Complaint.create({
            user: req.user.id,
            title,
            description,
            location,
            vehicleNumber
        });

        res.redirect("/dashboard");

    } catch (err) {
        console.log(err);
        res.send("Error submitting complaint");
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
        res.send("Error fetching complaints");
    }
};