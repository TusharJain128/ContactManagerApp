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
      let { name, number ,email} = data

      if (!name) {
        return res.status(400).send({ status: false, message: "Name is required" })
      }
      data.name = name.toLowerCase()

      if (!number) {
        return res.status(400).send({ status: false, message: "Number is required" })
      }

      let uniqueCheck = await contactModel.findOne({ number: number, isDeleted: false })
      if (uniqueCheck) {
        return res.status(400).send({ status: false, message: "Number is already exist" })
      }

      if(email){
        data.email = email.toLowerCase()
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
      let { number, name, email} = data
      let contactId = req.params.contactId

      let checkContactExist = await contactModel.findOne({_id: contactId, isDeleted:false})
      if(!checkContactExist){
        return res.status(404).send({status:false, message:"Contact is not exist"})
      }

      if (number) {
        let uniqueCheck = await contactModel.findOne({ number: number, isDeleted: false })
        if (uniqueCheck) {
          return res.status(400).send({ status: false, message: "Number is already exist" })
        }
      }

      if(name){
        data.name = name.toLowerCase()
      }

      if(email){
        data.email = email.toLowerCase()
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

  async getContacts(req, res) {

    try {
      let data = req.body
      let {name, email} = data

      let filter = {isDeleted: false}

      if(name){
        data.name = name.toLowerCase()
        filter.name = data.name
      }

      if(email){
        data.email = email.toLowerCase()
        filter.email = email
      }

      let findContacts = await contactModel.find(filter).sort({name: 1})

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

      let contactData = await contactModel.findOne({_id: contactId, isDeleted: false})
      if(!contactData){
        return res.status(404).send({status:false, message:"contact is not exist"})
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



