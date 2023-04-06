const mongoose =  require('mongoose')

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports = mongoose.model("User", userSchema)

