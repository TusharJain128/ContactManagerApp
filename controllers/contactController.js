const mongoose = require("mongoose");

const BaseController = require("./baseController");

const contact = require("../models/contact");

class contactController extends BaseController {
  constructor() {
    super(contact);
  }
  async addContact(req, res) {
    try {
  //     let data = req.body
  //     let { name, number } = data
  
  //     if (!name) {
  //       return res.status(400).send({ status: false, message: "Name is required" })
  //     }
  
  //     if (!number) {
  //       return res.status(400).send({ status: false, message: "Number is required" })
  //     }
  
  //     let savedContact = await contactModel.create(data)
  
  //     res.status(201).send({ status: true, message: savedContact })

      res.send("hello api")
    }
    catch (error) {
      res.status(500).send({ status: false, error: error.message })
    }
  }
}
  module.exports = contactController;
  


