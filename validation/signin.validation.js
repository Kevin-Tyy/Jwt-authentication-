const {check , validationResult } = require('express-validator')


const signinvalidate  = [
    check("username").notEmpty().withMessage("Enter a username"),
    check("password").notEmpty().withMessage("Enter a password").isLength({min : 8}).withMessage("Password must be at least 8 characters").matches(/[!@#$%^&*(),.?/":|{}<>]/).withMessage("Password must be at least one special character")

];
const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.array().length>0){    
        return res.send({ error : errors.array()[0].msg})
    }
    next();
}


module.exports = {
    signinvalidate, 
    isRequestValidated
}

