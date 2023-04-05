const express = require("express");

const contactController = require("../../controllers/contactController");

const router = express.Router();
const ContactController = new contactController();

/**
 * @route   POST api/users
 * @desc    Register User
 * @access  Public
 */
router.get("/", ContactController.getAll.bind(ContactController));

module.exports = router;
