const jwt = require('jsonwebtoken')
const contactModel = require('../models/contactModel')
const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const setRateLimit = require("express-rate-limit");

exports.authentication = function(req,res,next){

    try {
        let token= req.headers["x-api-key"]
        if(!token){
            return res.status(400).send({status:false, message:"token is not present in header"})
        }
    
        let decode = jwt.verify(token, 'FSOC', (err,decode)=>{
            if(err){
                return res.status(401).send({status:false, message:err.message})
            }
            else{
                req.decode = decode
                next()
            }
        })
    }
    catch (error) {
        return res.status(500).send({status:false, error:error.message})
    }

}

exports.autherisation = async function(req,res,next){
    try {
        let contactId = req.params.contactId
        if (!mongoose.isValidObjectId(contactId)) {
            return res.status(400).send({ status: false, message: "Please enter valid contactId in params" })
          }

        let checkAuth = await contactModel.findOne({_id: contactId})

        if(checkAuth.userId != req.decode.userId){
            return res.status(403).send({status:false, message:"You are not autherised"})
        }

        next()
    }
    catch (error) {
        return res.status(500).send({status:false, error:error.message})
    }
}


exports.RateLimiter = setRateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        status: false,
        message: "You have exceeded your 5 requests per minute limit."
    },
    headers: true,
})