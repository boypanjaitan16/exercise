const express   = require('express')
const router    = express.Router()

const {login, loginValidation, register, registerValidation} = require('../src/controllers/authController')
const {verifyToken} = require('../src/middlewares/authMiddleware')
const activitiesController  = require('../src/controllers/activitiesController')
const profileController     = require('../src/controllers/profileController')
const categoryController    = require('../src/controllers/categoryController')

router.post('/auth/login', loginValidation, login)
router.post('/auth/register', registerValidation, register)

router.use('/categories', verifyToken)
router.get('/categories', categoryController.index)
router.post('/categories/create', categoryController.createValidation, categoryController.create)

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
