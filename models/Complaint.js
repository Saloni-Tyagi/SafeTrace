const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    vehicleNumber: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved", "Rejected"],
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Complaint", complaintSchema);