const mongoose = require("mongoose");

const BaseController = require("./baseController");

const userModel = require("../models/userModel");

const jwt = require('jsonwebtoken')

class userController extends BaseController {
    constructor() {
        super(userModel);
    }

    //------------------------------------Register User--------------------------------->

    async registerUser(req, res) {

        try {
            let data = req.body
            let { firstName, lastName, email, password, mobile } = data

            if (!firstName) {
                return res.status(400).send({ status: false, message: "first name is required" })
            }

            if (!lastName) {
                return res.status(400).send({ status: false, message: "last name is required" })
            }

            if (!email) {
                return res.status(400).send({ status: false, message: "email is required" })
            }

            let uniqueCheckEmail = await userModel.findOne({ email: email, isDeleted: false })
            if (uniqueCheckEmail) {
                return res.status(400).send({ status: false, message: "email is already exist" })
            }

            if (!password) {
                return res.status(400).send({ status: false, message: "password is required" })
            }

            if (!mobile) {
                return res.status(400).send({ status: false, message: "mobile number is required" })
            }

            let uniqueCheckMobile = await userModel.findOne({ mobile: mobile, isDeleted: false })
            if (uniqueCheckMobile) {
                return res.status(400).send({ status: false, message: "Mobile number is already exist" })
            }

            let createUser = await userModel.create(data)

            res.status(201).send({ status: true, message: createUser })
        }
    catch(error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

    //------------------------------------Login User--------------------------------->

    async loginUser(req,res){

        try {
            let data = req.body
            let {email, password} = data
    
            if (!email) {
                return res.status(400).send({ status: false, message: "email is required" })
            }
    
            let checkEmail = await userModel.findOne({ email: email, isDeleted: false })
            if (!checkEmail) {
                return res.status(400).send({ status: false, message: "email is not registered" })
            }
    
            if (!password) {
                return res.status(400).send({ status: false, message: "password is required" })
            }
    
            if(checkEmail.password == password){
    
                let token = jwt.sign({userId: checkEmail._id}, "FSOC")
                
                res.status(200).send({status:true, message: token})
            }
        }
        catch (error) {
            res.status(500).send({ status: false, error: error.message })
        }
    }

}

module.exports = userController