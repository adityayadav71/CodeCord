const express = require('express');
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router();

// Authentication
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/isLoggedIn', authController.isLoggedIn);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

// User Profile
router.get('/profile', userController.getUserData);
router.post('/profile', userController.createUserProfile);

module.exports = router