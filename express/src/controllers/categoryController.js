const {body, validationResult} = require('express-validator')
const {responseError, responseFailed, responseSuccess} = require('../helpers/authHelper')

const Category  = require('../models/Category')
const User      = require('../models/User')

exports.index = async (req, res) => {
    try{
        const {userId}  = req.user

        const user      = await User.findById(userId).populate('categories')
        const result    = await Promise.all(user.categories.map(async item => {

            const cat   = await Category.findById(item.id).populate('activities')

            item.activities = cat.activities;

            return Promise.resolve(item)
        }));

        responseSuccess(res, result)
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

        const {name, description}   = req.body
        const {userId}          = req.user
        const user              = await User.findById(userId);
        const categoryModel     = new Category({user:userId, name, description})

        const category  = await categoryModel.save()

        user.categories.push(category)
        await user.save()

        responseSuccess(res, category)
    }
    catch(err){
        responseError(res, err)
    }
}

exports.createValidation = [
    body('name', 'Category name cannot be empty').notEmpty().custom(name => {
        return Category.findOne({name}).then(category => {
            if(category){
                return Promise.reject('Category with this name already exists')
            }
        })
    })
]

exports.show = (req, res) => {

}

exports.update = (req, res) => {

}

exports.destroy = (req, res) => {

}