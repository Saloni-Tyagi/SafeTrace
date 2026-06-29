const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const complaintController = require("../controllers/complaintController");

router.get("/complaint", authMiddleware, (req, res) => {
    res.render("complaint");
});

router.post(
    "/complaint",
    authMiddleware,
    complaintController.submitComplaint
);

module.exports = router;

router.get(
    "/my-complaints",
    authMiddleware,
    complaintController.getMyComplaints
);