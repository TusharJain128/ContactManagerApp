const express = require("express");

const contactController = require("../../controllers/contactController");

const router = express.Router();
const ContactController = new contactController()
/**
 * @route   Get api/users
 * @desc    Register User
 * @access  Public
 */
router.get("/addContact", ContactController.addContact.bind(ContactController));

module.exports = router;
