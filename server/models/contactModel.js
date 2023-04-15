const mongoose =  require('mongoose')

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    number: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address:{
        type: String,
        trim: true
    },
    birthday:{
        type: String
    },
    website:{
        type: String,
        trim: true
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