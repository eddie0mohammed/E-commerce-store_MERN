
const express = require('express');

const checkAuth = require('../middlewares/checkAuth');
const checkIsAdmin = require('../middlewares/checkIsAdmin');
const authController = require('../controllers/authController');


const router = express.Router();




// @route   POST /auth/register
// @desc    Register
// @access  Public
router.post('/register', authController.register);

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






module.exports = router;