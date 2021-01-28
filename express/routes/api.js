const express   = require('express')
const router    = express.Router()

const {verifyToken} = require('../src/middlewares/authMiddleware')

const authController        = require('../src/controllers/authController')
const activitiesController  = require('../src/controllers/activitiesController')
const profileController     = require('../src/controllers/profileController')
const categoryController    = require('../src/controllers/categoryController')

router.post('/auth/login', authController.loginValidation, authController.login)
router.post('/auth/login/provider', authController.loginProviderValidation, authController.loginProvider)
router.post('/auth/register', authController.registerValidation, authController.register)

router.use('/categories', verifyToken)
router.get('/categories', categoryController.index)
router.get('/categories/:id', categoryController.show)
router.post('/categories/create', categoryController.createValidation, categoryController.create)
router.patch('/categories/:id', categoryController.updateValidation, categoryController.update)
router.delete('/categories/:id', categoryController.destroy)

router.use('/activities', verifyToken)
router.get('/activities', activitiesController.index)
router.post('/activities/create', activitiesController.createValidation, activitiesController.create)
router.get('/activities/:id', activitiesController.show)
router.patch('/activities/:id', activitiesController.update)
router.delete('/activities/:id', activitiesController.destroy)

router.use('/profile', verifyToken)
router.post('/profile/update', profileController.updateProfileValidator, profileController.updateProfile)
router.post('/profile/update/password', profileController.updatePasswordValidator, profileController.updatePassword)
router.delete('/profile/remove-avatar', profileController.removeAvatar)

module.exports  = router
