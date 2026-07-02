const Complaint = require("../models/Complaint");

exports.dashboard = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("user", "name email");

        const totalComplaints = complaints.length;

        const pendingComplaints = complaints.filter(
            c => c.status === "Pending"
        ).length;

        const inProgressComplaints = complaints.filter(
            c => c.status === "In Progress"
        ).length;

        const resolvedComplaints = complaints.filter(
            c => c.status === "Resolved"
        ).length;

        res.render("adminDashboard", {
            complaints,
            totalComplaints,
            pendingComplaints,
            inProgressComplaints,
            resolvedComplaints
        });

    } catch (err) {
        console.log(err);
        res.send("Error loading admin dashboard");
    }
};

exports.updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;

        await Complaint.findByIdAndUpdate(
            req.params.id,
            { status }
        );

        res.redirect("/admin/dashboard");

    } catch (err) {
        console.log(err);
        res.send("Error updating complaint status");
    }
};

exports.deleteComplaint = async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.log(err);
        res.send("Error deleting complaint");
    }
};