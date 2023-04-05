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

/**
 * @route   Post api/users
 * @desc    Edit Contact
 * @access  Public
 */
router.post("/editContact", ContactController.editContact.bind(ContactController));

/**
 * @route   Delete api/users
 * @desc    delete Contact
 * @access  Public
 */
router.delete("/deleteContact", ContactController.deleteContact.bind(ContactController));


module.exports = router;
