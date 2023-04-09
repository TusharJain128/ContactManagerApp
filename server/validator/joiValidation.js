const Joi = require('joi')

//---------------------------------Create User-------------------------------------->

exports.createUserJoi = Joi.object({

    firstName: Joi.string().trim().required().regex(/^[a-zA-Z ]+$/).message("please provide valid first name"),

    lastName: Joi.string().trim().required().regex(/^[a-zA-Z ]+$/).message("please provide valid last name"),

    email:Joi.string().trim().required().regex(/^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/).message("please enter valid email"),

    password:Joi.string().trim().required().min(8).max(15).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).message("password must contain one lower case one special character and one numerical value"),

    mobile:Joi.string().trim().required().regex(/^[5-9]{1}[0-9]{9}$/).message("please enter valid mobile number")

})

//---------------------------------Login User-------------------------------------->

exports.loginJoi=Joi.object({

    email:Joi.string().trim().required().regex(/^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/).message("please enter valid email"),
    
    password:Joi.string().trim().required().min(8).max(15).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).message("password must contain one lower case one special character and one numerical value")
})

//---------------------------------Create Contact-------------------------------------->

exports.createContactJoi = Joi.object({

    name: Joi.string().trim().required().regex(/^[a-zA-Z ]+$/).message("please provide valid first name"),

    email:Joi.string().trim().required().regex(/^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/).message("please enter valid email"),
    
    number:Joi.string().trim().required(),

    address: Joi.string().trim().optional().regex(/^[a-zA-Z ]+$/).message("please provide valid address"),

    website: Joi.string().trim().optional().regex(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/).message("please enter valid website")

})

// //---------------------------------Edit Contact-------------------------------------->

exports.editContactJoi = Joi.object({

    name: Joi.string().trim().optional().regex(/^[a-zA-Z ]+$/).message("please provide valid first name"),

    email:Joi.string().trim().optional().regex(/^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/).message("please enter valid email"),
    
    number:Joi.string().trim().optional(),

    address: Joi.string().trim().optional().regex(/^[a-zA-Z ]+$/).message("please provide valid address"),

    website: Joi.string().trim().optional().regex(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/).message("please enter valid website")

})