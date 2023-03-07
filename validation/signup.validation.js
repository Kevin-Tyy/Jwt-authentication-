const {check, validationResult } = require('express-validator');

const signupvalidate = [
    check('username').notEmpty().withMessage('Please enter a username').isLength({min : 6}).withMessage('Username must be at least 6 characters'),
    check('password').notEmpty().withMessage('Please enter a password').isLength({min : 8}).withMessage('Password must be at least 8 characters').matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("your password should have at least one special character"),
    check('email').notEmpty().withMessage('Please enter an email address').isEmail().withMessage("Please enter a valid email address")
]

const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.array().length>0){
        return res.send({ error : errors.array()[0].msg})
    }
    next();
}

module.exports = {
    signupvalidate, 
    isRequestValidated
}