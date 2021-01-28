const {body, check, validationResult} = require('express-validator')
const {responseError, responseSuccess, responseFailed, generateAccessToken} = require('../helpers/authHelper')
const {userParser}    = require('../helpers/modelHelper')

const User      = require('../models/User')

const bycript   = require('bcryptjs')
const nodeFetch = require('node-fetch');
const fs        = require('fs')

exports.login = async (req, res) => {
    try{
        const errors    = validationResult(req)

        if(!errors.isEmpty()){
            responseFailed(res, errors.array())
            return;
        }
        
        const {email, password}  = req.body
        const user  = await User.findOne({ email })

        if(!user){
            throw new Error('Sorry, we can\'t find an user with this credential {ERR_CODE:1}')
        }

        const matched   = await bycript.compare(password, user.password);

        if(matched === false){
            throw new Error('Sorry, we can\'t find an user with this credential {ERR_CODE:2}')
        }

        responseSuccess(res, {
            token   : generateAccessToken(user.id),
            user    : await userParser(user, req)
        })
    }
    catch(err){
        responseError(res, err)
    }
}

exports.loginValidation = [
    body('email', 'Email is required').notEmpty().isEmail(),
    body('password', 'Password required').notEmpty()
]

exports.loginProvider = async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            responseFailed(res, errors.array())
            return;
        }

        const {email, name, picture}    = req.body
        let user      = await User.findOne({email})
            
        if(user){
            responseSuccess(res, {
                token   : generateAccessToken(user.id),
                user    : await userParser(user, req)
            })
            return;
        }

        

        const hashedPassword    = await bycript.hash('password', 10)
        const userModel         = new User({ avatarExt: '.jpg', email, name, password : hashedPassword }) 

        user    = await userModel.save();

        const response  = await nodeFetch(picture);
        const buffer    = await response.buffer();

        fs.writeFile(`./public/avatar/${user.id}.jpg`, buffer, () => {
            console.log(`${picture} saved!`)
        })
        
        responseSuccess(res, {
            token   : generateAccessToken(user.id),
            user    : await userParser(user, req)
        })
    }
    catch(err){
        responseError(res, err)
    }
}

exports.loginProviderValidation = [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Email is required').notEmpty()
]

exports.register = async (req, res) => {
    try{
        const errors    = validationResult(req)

        if(!errors.isEmpty()){
            responseFailed(res, errors.array())
            return;
        }


        const {email, name, password}    = req.body

        const hashedPassword    = await bycript.hash(password, 10)
        const userModel         = new User({ email, name, password : hashedPassword }) 

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
    body('email', 'Email is required').notEmpty(),
    body('name', 'Name is required').notEmpty(),
    body('password', 'Password is required').notEmpty().isLength({min: 6}).bail().withMessage('Password need to be six or more chars'),
    body('password_confirmation', 'Password Confirmation is required').notEmpty().bail().custom((value, { req }) => {
        if (value !== req.body.password) {
            
            throw new Error('Password confirmation is incorrect');
        }
        return true
    }),
    body('email').bail().custom(email => {
        return User.findOne({email}).then(user => {
            if(user){
                return Promise.reject('Email already used')
            }
        })
    })

]