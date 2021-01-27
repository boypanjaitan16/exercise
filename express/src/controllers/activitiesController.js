const {responseSuccess, responseFailed, responseError} = require('../helpers/authHelper')
const {body, validationResult} = require('express-validator')

const Activity  = require('../models/Activity')
const User      = require('../models/User')
const Category  = require('../models/Category')

exports.index = async (req, res) => {
    try{
        const {userId}  = req.user
        const user      = await User.findById(userId).populate('activities')

        responseSuccess(res, user.activities)
    }
    catch(err){
        responseError(res, err)
    }
}

exports.create = async (req, res) => {
    try{
        const errors    = validationResult(req)

        if(!errors.isEmpty()){
            responseFailed(res, errors.array())
            return;
        }

        const {userId}  = req.user
        const {name, description, timeStart, timeEnd, categoryId}   = req.body

        
        const activityModel     = new Activity({user: userId, category:categoryId, name, description, timeStart, timeEnd})
        const activity          = await activityModel.save()

        const user  = await User.findById(userId)
        user.activities.push(activity);
        await user.save();

        if(categoryId){
            const category  = await Category.findById(categoryId)
            category.activities.push(activity)
            await category.save()
        }

        responseSuccess(res, activity)
    }
    catch(err){
        responseError(res, err)
    }
}

exports.createValidation = [
    body('name', 'Activity name is required').notEmpty(),
    // body('description', 'Description is required').notEmpty(),
    body('timeStart', 'Time start is required').notEmpty(),
    body('timeEnd', 'Time end is required').notEmpty()
]

exports.show = (req, res) => {

}

exports.update = (req, res) => {

}

exports.destroy = async (req, res) => {
    try{
        const id    = req.params.id
        const obj   = await Activity.findOne({_id: id})

        obj.remove()

        const {userId}  = req.user
        const user      = await User.findById(userId).populate('activities')

        responseSuccess(res, user.activities)
    }
    catch(err){
        responseError(res, err)
    }
    
}