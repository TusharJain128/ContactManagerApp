const express = require("express");

const contactController = require("../../controllers/contactController");

const router = express.Router();
const ContactController = new contactController()

/**
 * @route   Post api/users
 * @desc    Create Contact
 * @access  Public
 */
router.post("/createContact", ContactController.createContact.bind(ContactController));

/**
 * @route   Post api/users
 * @desc    Edit Contact
 * @access  Public
 */
router.post("/editContact/:contactId", ContactController.editContact.bind(ContactController));

/**
 * @route   GET api/users
 * @desc    Get All Contact
 * @access  Public
 */
router.get("/getContacts", ContactController.getContacts.bind(ContactController));

/**
 * @route   GET api/users
 * @desc    Get One Contact
 * @access  Public
 */
router.get("/getContact/:contactId", ContactController.getContact.bind(ContactController));

/**
 * @route   Delete api/users
 * @desc    delete Contact
 * @access  Public
 */
router.delete("/deleteContact/:contactId", ContactController.deleteContact.bind(ContactController));


module.exports = router;
