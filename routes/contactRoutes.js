const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const contactController = require("../controllers/contactController");

router.get(
    "/contacts",
    authMiddleware,
    contactController.getContacts
);

router.post(
    "/contacts",
    authMiddleware,
    contactController.addContact
);

router.get(
    "/contacts/edit/:id",
    authMiddleware,
    contactController.editContactPage
);

router.post(
    "/contacts/update/:id",
    authMiddleware,
    contactController.updateContact
);

router.get(
    "/contacts/delete/:id",
    authMiddleware,
    contactController.deleteContact
);

module.exports = router;