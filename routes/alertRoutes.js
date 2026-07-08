const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const alertController = require("../controllers/alertController");

router.post("/sos", authMiddleware, alertController.createAlert);

router.get("/alerts", authMiddleware, alertController.getAlerts);

module.exports = router;