const mongoose = require("mongoose");
const BaseController = require("./baseController");
const contactModel = require("../models/contactModel");
const { createContactJoi, editContactJoi } = require("../validator/joiValidation")
const { AvatarGenerator } = require('random-avatar-generator')

class contactController extends BaseController {
  constructor() {
    super(contactModel);
  }

  //--------------------------Create contact------------------------------->

  async createContact(req, res) {
    try {
      let data = req.body

      let error
      const validation = await createContactJoi.validateAsync(data).then(() => true).catch((err) => { error = err.message; return null })
      if (!validation) return res.status(400).send({ status: false, message: error })

      data.userId = req.decode.userId

      let uniqueCheck = await contactModel.findOne({ number: data.number, userId: data.userId, isDeleted: false })
      if (uniqueCheck) {
        return res.status(400).send({ status: false, message: "Number is already exist" })
      }

      if (data.email) {
        data.email = data.email.toLowerCase()
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
      let contactId = req.params.contactId

      if (!mongoose.isValidObjectId(contactId)) {
        return res.status(400).send({ status: false, message: "Please enter valid contactId in params" })
      }

      let error
      const validation = await createContactJoi.validateAsync(data).then(() => true).catch((err) => { error = err.message; return null })
      if (!validation) return res.status(400).send({ status: false, message: error })


      let checkContactExist = await contactModel.findOne({ _id: contactId, userId: req.decode.userId, isDeleted: false })
      if (!checkContactExist) {
        return res.status(404).send({ status: false, message: "Contact is not exist" })
      }

      if (data.number) {
        let uniqueCheck = await contactModel.findOne({ number: number, userId: req.decode.userId, isDeleted: false })
        if (uniqueCheck) {
          return res.status(400).send({ status: false, message: "Number is already exist" })
        }
      }

      // if(data.name){
      //   data.name = name.toLowerCase()
      // }

      if (data.email) {
        data.email = data.email.toLowerCase()
      }

      let savedContact = await contactModel.findOneAndUpdate(
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

  //<-------------------------------------get Contact------------------------------>

  // async getContacts(req, res) {

  //   try {
  //     let data = req.body
  //     let {name, email} = data

  //     let filter = {isDeleted: false}

  //     if(name){
  //       data.name = name.toLowerCase()
  //       filter.name = {$regex : name}
  //     }

  //     if(email){
  //       data.email = email.toLowerCase()
  //       filter.email = {$regex : email}
  //     }

  //     let findContacts = await contactModel.find(filter).sort({name: 1})

  //     res.status(200).send({ status: true, message: findContacts })
  //   }
  //   catch (error) {
  //     res.status(500).send({ status: false, error: error.message })
  //   }
  // }

  async getContacts(req, res) {

    try {
      let findContacts = await contactModel.find({ userId: req.decode.userId, isDeleted: false }).sort({ name: 1 })

      res.status(200).send({ status: true, message: findContacts })
    }
    catch (error) {
      res.status(500).send({ status: false, error: error.message })
    }
  }

  //---------------------------Get Contact By Id-------------------------->

  async getContact(req, res) {

    try {
      let contactId = req.params.contactId

      if (!mongoose.isValidObjectId(contactId)) {
        return res.status(400).send({ status: false, message: "Please enter valid contactId in params" })
      }

      let contactData = await contactModel.findOne({ _id: contactId, isDeleted: false })
      if (!contactData) {
        return res.status(404).send({ status: false, message: "contact is not exist" })
      }

      res.status(200).send({ status: true, message: contactData })
    }
    catch (error) {
      res.status(500).send({ status: false, error: error.message })
    }
  }

  //---------------------------------------Delete Contact----------------------------->

  async deleteContact(req, res) {

    try {
      let contactId = req.params.contactId

      if (!mongoose.isValidObjectId(contactId)) {
        return res.status(400).send({ status: false, message: "Please enter valid contactId in params" })
      }

      await contactModel.findOneAndUpdate(
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



