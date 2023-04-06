const express = require("express");

const userController = require("../../controllers/userController");

const router = express.Router();
const UserController = new userController()

/**
 * @route   Post api/user
 * @desc    Create user
 * @access  Public
 */
router.post("/createUser", UserController.registerUser.bind(UserController));

/**
 * @route   Post api/user
 * @desc    Login user
 * @access  Public
 */
router.post("/loginUser", UserController.loginUser.bind(UserController));

module.exports = router;