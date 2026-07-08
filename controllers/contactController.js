const Contact = require("../models/Contact");

// Add Contact
exports.addContact = async (req, res) => {
    try {

        const { name, phone, relation } = req.body;

        await Contact.create({
            name,
            phone,
            relation,
            user: req.user.id
        });

        res.redirect("/contacts");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};


// Get All Contacts
exports.getContacts = async (req, res) => {
    try {

        const contacts = await Contact.find({
            user: req.user.id
        });

        res.render("contacts", { contacts });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};


// Show Edit Page
exports.editContactPage = async (req, res) => {
    try {

        const contact = await Contact.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!contact) {
            return res.send("Contact not found");
        }

        res.render("editContact", { contact });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};


// Update Contact
exports.updateContact = async (req, res) => {
    try {

        const { name, phone, relation } = req.body;

        await Contact.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            {
                name,
                phone,
                relation
            }
        );

        res.redirect("/contacts");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};


// Delete Contact
exports.deleteContact = async (req, res) => {
    try {

        await Contact.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        res.redirect("/contacts");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};