const mongoose = require("mongoose");
const contactModel = require("../models/contactModel");
const { createContactJoi, editContactJoi } = require("../validator/joiValidation")
const { AvatarGenerator } = require('random-avatar-generator')

//--------------------------Create contact------------------------------->

module.exports.createContact = async function (req, res) {
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

module.exports.editContact = async function (req, res) {

  try {
    let data = req.body
    let contactId = req.params.contactId

    if (!mongoose.isValidObjectId(contactId)) {
      return res.status(400).send({ status: false, message: "Please enter valid contactId in params" })
    }

    let error
    const validation = await editContactJoi.validateAsync(data).then(() => true).catch((err) => { error = err.message; return null })
    if (!validation) return res.status(400).send({ status: false, message: error })


    let checkContactExist = await contactModel.findOne({ _id: contactId, userId: req.decode.userId, isDeleted: false })
    if (!checkContactExist) {
      return res.status(404).send({ status: false, message: "Contact is not exist" })
    }

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


module.exports.getContacts = async function (req, res) {

  try {
    let {name} = req.query
    let findContacts = await contactModel.find({ userId: req.decode.userId, isDeleted: false }).lean()

    let result = []
    if(name){
      for(let i=0; i<findContacts.length; i++){
        if(findContacts[i].name.toLowerCase().includes(name.toLowerCase())){
          result.push(findContacts[i])
        }
      }
      res.status(200).send({ status: true, message: result })
    }
    else{
    res.status(200).send({ status: true, message: findContacts })
  }}
  catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}

//---------------------------Get Contact By Id-------------------------->

module.exports.getContact = async function (req, res) {

  try {
    let contactId = req.params.contactId

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

module.exports.deleteContact = async function (req, res) {

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




