const {body, check, validationResult} = require('express-validator')
const {responseError, responseSuccess, responseFailed, generateAccessToken} = require('../helpers/authHelper')
const User      = require('../models/User')
const bycript   = require('bcryptjs')

exports.login = async (req, res) => {
    try{
        const errors    = validationResult(req)

        if(!errors.isEmpty()){
            responseFailed(res, errors.array())
            return;
        }
        
        const {username, password}  = req.body
        const user  = await User.findOne({ username })

        if(!user){
            throw new Error('Sorry, we can\'t find an user with that username and password {ERR_CODE:1}')
        }

        const matched   = await bycript.compare(password, user.password);

        if(matched === false){
            throw new Error('Sorry, we can\'t find an user with that username and password {ERR_CODE:2}')
        }

        responseSuccess(res, {
            token   : generateAccessToken(user.id),
            user
        })
    }
    catch(err){
        responseError(res, err)
    }
}

exports.loginValidation = [
    body('username', 'Username is required').notEmpty(),
    body('password', 'Password required').notEmpty()
]

exports.register = async (req, res) => {
    try{
        const errors    = validationResult(req)

        if(!errors.isEmpty()){
            responseFailed(res, errors.array())
            return;
        }


        const {username, name, password}    = req.body

        const hashedPassword    = await bycript.hash(password, 10)
        const userModel         = new User({ username, name, password : hashedPassword }) 

        const user  = await userModel.save();
        
        responseSuccess(res, {
            token   : generateAccessToken(userModel.id),
            user
        })
    }
    catch(err){
        responseError(res, err)
    }
}

exports.registerValidation = [
    body('username', 'Username is required').notEmpty(),
    body('name', 'Name is required').notEmpty(),
    body('password', 'Password is required').notEmpty().isLength({min: 5}).bail().withMessage('Password need more than six chars'),
    body('password_confirmation', 'Password Confirmation is required').notEmpty().bail().custom((value, { req }) => {
        if (value !== req.body.password) {
            
            throw new Error('Password confirmation is incorrect');
        }
        return true
    }),
    body('username').bail().custom(username => {
        return User.findOne({username}).then(user => {
            if(user){
                return Promise.reject('Username already taken')
            }
        })
    })

]