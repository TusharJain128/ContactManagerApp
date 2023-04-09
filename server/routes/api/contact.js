const express = require("express");

const contactController = require("../../controllers/contactController");
const {authentication , autherisation} = require('../../middleware/middleware')

const router = express.Router();
const ContactController = new contactController()

/**
 * @route   Post api/users
 * @desc    Create Contact
 * @access  Public
 */
router.post("/createContact", authentication, ContactController.createContact.bind(ContactController));

/**
 * @route   Put api/users
 * @desc    Edit Contact
 * @access  Public
 */
router.put("/editContact/:contactId", authentication, autherisation, ContactController.editContact.bind(ContactController));

/**
 * @route   GET api/users
 * @desc    Get All Contact
 * @access  Public
 */
router.get("/getContacts", authentication, ContactController.getContacts.bind(ContactController));

/**
 * @route   GET api/users
 * @desc    Get One Contact
 * @access  Public
 */
router.get("/getContact/:contactId",authentication,autherisation, ContactController.getContact.bind(ContactController));

/**
 * @route   Delete api/users
 * @desc    delete Contact
 * @access  Public
 */
router.delete("/deleteContact/:contactId",authentication,autherisation, ContactController.deleteContact.bind(ContactController));


module.exports = router;
