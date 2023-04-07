const mongoose = require("mongoose");
const BaseController = require("./baseController");
const userModel = require("../models/userModel");
const {createUserJoi, loginJoi} = require("../validator/joiValidation")
const jwt = require('jsonwebtoken')

class userController extends BaseController {
    constructor() { 
        super(userModel);
    }

    //------------------------------------Register User--------------------------------->

    async registerUser(req, res) {

        try {
            let data = req.body

            let error
            const validation = await createUserJoi.validateAsync(data).then(()=> true).catch((err)=>{error=err.message; return null})
            if(!validation) return res.status(400).send({  status: false,message: error})

            data.email = data.email.toLowerCase()
            let uniqueCheckEmail = await userModel.findOne({ email: data.email, isDeleted: false })
            if (uniqueCheckEmail) {
                return res.status(400).send({ status: false, message: "email is already exist" })
            }

            let uniqueCheckMobile = await userModel.findOne({ mobile: data.mobile, isDeleted: false })
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
            
            let error
            const validation = await loginJoi.validateAsync(data).then(()=> true).catch((err)=>{error=err.message; return null})
            if(!validation) return res.status(400).send({  status: false,message: error})
    
            data.email = data.email.toLowerCase()
            let checkEmail = await userModel.findOne({ email: data.email, isDeleted: false })
            if (!checkEmail) {
                return res.status(400).send({ status: false, message: "email is not registered, please register first" })
            }
    
            if(checkEmail.password != data.password){
                return res.status(400).send({status:false, message:"Please enter correct password"})
            }
            else{
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