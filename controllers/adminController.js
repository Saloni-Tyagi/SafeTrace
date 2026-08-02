const Complaint = require("../models/Complaint");
const User = require("../models/User");
const Alert = require("../models/Alert");
const { buildVehicleRiskProfiles } = require("../utils/riskScore");

exports.dashboard = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        const users = await User.find();
        const alerts = await Alert.find();

        const totalComplaints = complaints.length;
        const pendingComplaints = complaints.filter(c => c.status === "Pending").length;
        const inProgressComplaints = complaints.filter(c => c.status === "In Progress").length;
        const resolvedComplaints = complaints.filter(c => c.status === "Resolved").length;

        const riskProfiles = buildVehicleRiskProfiles(complaints);

        res.render("adminDashboard", {
            complaints,
            users,
            alerts,
            totalComplaints,
            pendingComplaints,
            inProgressComplaints,
            resolvedComplaints,
            riskProfiles
        });

    } catch (err) {
        console.error("Admin dashboard error:", err.message);
        res.status(500).render("error", {
            message: "Could not load admin dashboard.",
            status: 500
        });
    }
};

exports.updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["Pending", "In Progress", "Resolved", "Rejected"];

        if (!validStatuses.includes(status)) {
            return res.status(400).render("error", {
                message: "Invalid status value.",
                status: 400
            });
        }

        await Complaint.findByIdAndUpdate(req.params.id, { status });
        res.redirect("/admin/dashboard");

    } catch (err) {
        console.error("Update complaint status error:", err.message);
        res.status(500).render("error", {
            message: "Could not update complaint status.",
            status: 500
        });
    }
};

exports.deleteComplaint = async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.error("Delete complaint error:", err.message);
        res.status(500).render("error", {
            message: "Could not delete complaint.",
            status: 500
        });
    }
};