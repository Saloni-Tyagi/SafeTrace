const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    adminController.dashboard
);

router.post(
    "/complaints/:id/status",
    authMiddleware,
    adminMiddleware,
    adminController.updateComplaintStatus
);

router.post(
    "/complaints/:id/delete",
    authMiddleware,
    adminMiddleware,
    adminController.deleteComplaint
);

module.exports = router;