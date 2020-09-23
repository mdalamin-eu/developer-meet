const { check }= require('express-validator')

exports.UserValidator=[
    check('name')
    .not()
    .isEmpty()
    .withMessage('name is required'),

    check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required'),

    check('password')
    .not()
    .isEmpty()
    .withMessage('password should not be empty')
    .isLength({min:8})
    .withMessage('You should give password minimum eight characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/,"i")
    .withMessage('You have to give  password at least one capital letter and one small letter, one number and one speacial character like (@$.!%*#?&)'),

    check('phone')
    .not()
    .isEmpty()
    .withMessage('Password should not be empty')
    .isLength({min:10})
    .withMessage('Must be Phone at least 10 number')

]