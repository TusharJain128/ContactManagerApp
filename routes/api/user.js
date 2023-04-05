const express = require("express");

const contactController = require("../../controllers/contactController");

const router = express.Router();
const ContactController = new contactController()
/**
 * @route   Post api/users
 * @desc    Add Contact
 * @access  Public
 */
router.post("/addContact", ContactController.addContact.bind(ContactController));

module.exports = router;
