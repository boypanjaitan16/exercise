const {responseSuccess, responseFailed, responseError} = require('../helpers/authHelper')
const {body, validationResult} = require('express-validator')
const Activity  = require('../models/Activity')

exports.index = async (req, res) => {
    try{
        const {userId}      = req.user
        const activities    = await Activity.find({userId})

        responseSuccess(res, activities)
    }
    catch(err){
        responseError(res, err)
    }
}

exports.create = async (req, res) => {
    try{
        const errors    = validationResult(req)

        if(!errors.isEmpty()){
            responseFailed(res, errors)
            return;
        }

        const {userId}  = req.user
        const {name, description, timeStart, timeEnd}   = req.body
        const activityModel     = new Activity({userId, name, description})
    
        const activity  = await activityModel.save()

        responseSuccess(res, activity)
    }
    catch(err){
        responseError(res, err)
    }
}

exports.createValidation = [
    body('name', 'Activity name is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('timeStart', 'Time start is required').notEmpty(),
    body('timeEnd', 'Time end is required').notEmpty()
]

exports.show = (req, res) => {

}

exports.update = (req, res) => {

}

exports.destroy = (req, res) => {

}