const express = require("express");

const {createContact,editContact,getContacts,getContact,deleteContact} = require("../../controllers/contactController");
const {authentication , autherisation} = require('../../middleware/middleware')

const router = express.Router();

/**
 * @route   Post api/contact
 * @desc    Create Contact
 * @access  Public
 */
router.post("/createContact", authentication, createContact);

/**
 * @route   Put api/contact
 * @desc    Edit Contact
 * @access  Public
 */
router.put("/editContact/:contactId", authentication, autherisation, editContact);

/**
 * @route   GET api/contact
 * @desc    Get All Contact
 * @access  Public
 */
router.get("/getContacts", authentication, getContacts);

/**
 * @route   GET api/contact
 * @desc    Get One Contact
 * @access  Public
 */
router.get("/getContact/:contactId",authentication,autherisation, getContact);

/**
 * @route   Delete api/contact
 * @desc    delete Contact
 * @access  Public
 */
router.delete("/deleteContact/:contactId",authentication,autherisation, deleteContact);


module.exports = router;
