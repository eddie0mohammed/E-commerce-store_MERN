
const express = require('express');

const checkAuth = require('../middlewares/checkAuth');
const checkIsAdmin = require('../middlewares/checkIsAdmin');
const authController = require('../controllers/authController');


const router = express.Router();




// @route   POST /auth/register
// @desc    Register
// @access  Public
router.post('/register', authController.register);

// @route   GET /auth/validate/:token
// @desc    Activate account
// @access  Public
router.get('/validate/:token', authController.activateAccount);

// @route   POST /auth/request-passwordreset
// @desc    Request Password reset
// @access  Public
router.post('/request-passwordreset', authController.requestPasswordReset);


// @route   GET /auth/resetPassword/:resetPasswordToken
// @desc    Redirect from email to reset password form
// @access  Private
router.get('/resetPassword/:resetPasswordToken', authController.redirectToResetPassword);


// @route   POST /auth/resetPassword
// desc     Reset password (from email)
// access   Private
router.post('/resetPassword/:resetPasswordToken', authController.resetPassword);

// @route   POST /auth/resetmypassword
// desc     Reset My password (from settings)
// access   Private
router.post('/resetmypassword', checkAuth, authController.resetMyPassword);

// @route   POST /auth/login
// @desc    Login
// @access  Public
router.post('/login', authController.login);

// @route   GET /auth/getUser
// @desc    Get user
// @access  Private
router.get('/getuser', checkAuth, authController.getUser);

// @route   GET /auth/getallusers
// @desc    Get allusers
// @access  Private + admin
router.get('/getallusers', checkAuth, checkIsAdmin, authController.getAllUsers);


// @route   GET /auth/user/:userId
// @desc    Get specific user
// @access  Private
router.get('/user/:userId', checkAuth, authController.getSpecificUser);

// @route   PATCH /auth/user
// @desc    Update user info
// @access  Private
router.patch('/user', checkAuth, authController.updateUser);







module.exports = router;