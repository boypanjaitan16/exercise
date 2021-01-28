const {body, validationResult} = require('express-validator')
const {responseError, responseFailed, responseSuccess} = require('../helpers/authHelper')

const Category  = require('../models/Category')
const User      = require('../models/User')
const Activity  = require('../models/Activity')

exports.index = async (req, res) => {
    try{
        const {userId}  = req.user

        const user      = await User.findById(userId).populate('categories')
        const result    = await Promise.all(user.categories.map(async item => {
            return Promise.resolve(await Category.findById(item.id).populate('activities'))
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

exports.show = async (req, res) => {
    try{
        const {id}  = req.params
        const cat   = await Category.findById(id).populate('activities');

        responseSuccess(res, cat)
    }
    catch(err){
        responseError(res, err)
    }
}

exports.update = async (req, res) => {
    try{
        const errors    = validationResult(req)
        if(!errors.isEmpty()){
            responseFailed(res, errors.array())
            return;
        }

        const {id}  = req.params
        const {name, description}   = req.body
        const cat   = await Category.findById(id)

        cat.name    = name;
        cat.description = description;

        await cat.save()

        responseSuccess(res, cat)
    }
    catch(err){
        responseError(res, err)
    }
}

exports.updateValidation = [
    body('name', 'Category name cannot be empty').notEmpty().bail().custom((name, {req}) => {
        return Category.findOne({name}).then(category => {
            if(category && category.id !== req.params.id){
                return Promise.reject('You already have a category with this name')
            }
        })
    })
]

exports.destroy = async (req, res) => {
    try{
        const {userId}  = req.user
        const {id}      = req.params

        const category  = await Category.findById(id).populate('activities')

        if(category){
            await Promise.all(category.activities.map(async activity => {
                await Activity.findById(activity.id).remove()
            }))

            await category.remove()
        }

        await this.index(req, res)
    }
    catch(err){
        responseError(res, err)
    }
}