const mongoose = require("mongoose");

const BaseController = require("./baseController");

const contactSchema = require("../models/contact");

const contact = mongoose.model("Contact", contactSchema);

class contactController extends BaseController {
  constructor() {
    super(contact);
  }
}

module.exports = contactController;
