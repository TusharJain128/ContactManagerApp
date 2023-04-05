const mongoose = require("mongoose");

const BaseController = require("./baseController");

const contactModel = require("../models/contact");

const { AvatarGenerator } = require('random-avatar-generator')

class contactController extends BaseController {
  constructor() {
    super(contactModel);
  }

  //--------------------------Create contact------------------------------->

  async addContact(req, res) {
    try {
      let data = req.body
      let { name, number } = data

      if (!name) {
        return res.status(400).send({ status: false, message: "Name is required" })
      }

      if (!number) {
        return res.status(400).send({ status: false, message: "Number is required" })
      }

      let uniqueCheck = await contactModel.findOne({ number: number, isDeleted: false })
      if (uniqueCheck) {
        return res.status(400).send({ status: false, message: "Number is already exist" })
      }

      const generator = new AvatarGenerator()
      data.profileImage = generator.generateRandomAvatar()

      let savedContact = await contactModel.create(data)

      res.status(201).send({ status: true, message: savedContact })
    }
    catch (error) {
      res.status(500).send({ status: false, error: error.message })
    }
  }

  //----------------------------------Edit Contact--------------------------------->

  async editContact(req, res) {

    try {
      let data = req.body
      let { number } = data
      let contactId = req.params.contactId

      let checkContactExist = await contactModel.findOne({_id: contactId, isDeleted:false})
      if(!checkContactExist){
        return res.status(404).send({status:false, message:"Contact doesn't exist"})
      }

      if (number) {
        let uniqueCheck = await contactModel.findOne({ number: number, isDeleted: false })
        if (uniqueCheck) {
          return res.status(400).send({ status: false, message: "Number is already exist" })
        }
      }

      let savedContact = await contactModel.findOne(
        { _id: contactId, isDeleted: false },
        data,
        { new: true }
      )

      res.status(200).send({ status: true, message: savedContact })
    }
    catch (error) {
      res.status(500).send({ status: false, error: error.message })
    }
  }

  //---------------------------------------Delete Contact----------------------------->

  async deleteContact(req, res) {

    try {
      let contactId = req.params.contactId

      await contactModel.findOne(
        { _id: contactId, isDeleted: false },
        { isDeleted: true },
        { new: true }
      )

      res.status(200).send({ status: true, message: "Contact is successfully deleted" })
    }
    catch (error) {
      res.status(500).send({ status: false, error: error.message })
    }
  }

}
module.exports = contactController;



