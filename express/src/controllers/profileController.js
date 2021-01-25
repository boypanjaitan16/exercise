const {body, validationResult} = require('express-validator')
const {responseError, responseFailed, responseSuccess} = require('../helpers/authHelper')
const {userParser} = require('../helpers/modelHelper')

const multer    = require('multer')
const path      = require('path')
const bycript   = require('bcryptjs')
const fs        = require('fs')
const User      = require('../models/User')

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/avatar')
        },
        filename: (req, file, cb) => {
            let ext = path.extname(file.originalname);
            cb(null, `${req.user.userId}${ext}`);
        }
    })
});

exports.updateProfile = async (req, res) => {
    try{
        console.log(req.body)
        const errors    = validationResult(req)

        if(!errors.isEmpty()){
            responseFailed(res, errors.array())
            return;
        }

        const user      = await User.findById(req.user.userId)

        const {name, email} = req.body
        user.name       = name;
        user.email      = email;

        if(req.file){
            user.avatarExt  = path.extname(req.file.originalname)
        }

        await user.save()

        responseSuccess(res, await userParser(user, req))
    }
    catch(err){
        responseError(res, err)
    }
}

exports.updateProfileValidator = [
    upload.single('avatar'),
    body('name', 'Name can not be empty').notEmpty(),
    body('email', 'Email cannot be empty').notEmpty(),
    body('email').bail().custom((email, {req}) => {
        return User.findOne({email}).then(user => {
            if(user && user.id !== req.user.userId){
                return Promise.reject('Email already used')
            }
        })
    }),
]

exports.updatePassword = async (req, res) => {
    try{
        const user  = await User.findById(req.user.userId)
        const {password, password_current}        = req.body
        const hashed    = await bycript.hash(password, 10)
        const matched   = await bycript.compare(password_current, user.password);

        if(matched === false){
            throw new Error('Your current password is not valid')
        }

        user.password   = hashed
        await user.save()

        responseSuccess(res)
    }
    catch(err){
        responseError(res, err)
    }
}

exports.updatePasswordValidator = [
    body('password_current', 'Current password is required').notEmpty(),
    body('password', 'Password is required').notEmpty().isLength({min: 6}).withMessage('Password need to be six or more chars'),
    body('password_confirmation', 'Password confirmation is required').bail().custom((value, { req }) => {
        if (value !== req.body.password) {
            
            throw new Error('Password confirmation is incorrect');
        }
        return true
    }),
]

exports.removeAvatar = async (req, res) => {
    try{
        const user  = await User.findById(req.user.userId)
        const loc   = `./public/avatar/${user.id}${user.avatarExt}`

        if(fs.existsSync(loc)){
            fs.unlinkSync(loc)
        }

        user.avatarExt  = null
        await user.save()

        responseSuccess(res, await userParser(user, req))
    }
    catch(err){
        responseError(res, err)
    }
}