const mongoose =  require('mongoose')

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    birthday:{
        type: String
    },
    website:{
        type: String
    },
    profileImage:{
        type: String
    },
    userId:{
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model("Contact", contactSchema);