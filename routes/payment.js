
const express = require('express');

const checkAuth = require('../middlewares/checkAuth');

const paymentController = require('../controllers/paymentController');

const router = express.Router();


// path    GET /payment/getToken/:userId
// desc     Get token from braintree
// access   Private
router.get('/getToken', checkAuth, paymentController.getToken);



// path     POST /payment/processpayment
// desc     post request with details to charge for payment
// access   Private
router.post('/processpayment', checkAuth, paymentController.processPayment);



module.exports = router;