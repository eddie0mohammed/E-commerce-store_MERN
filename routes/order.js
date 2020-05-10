
const express = require('express');

const checkAuth = require('../middlewares/checkAuth');
const checkIsAdmin = require('../middlewares/checkIsAdmin');
const orderController = require('../controllers/orderController');


const router = express.Router();




// path     POST /order/new
// desc     Create new order
// access   Private
router.post('/new', checkAuth, orderController.createOrder);


// path     GET /order/user
// desc     Get all userSpecific orders
// access   Private
router.get('/user', checkAuth, orderController.getUserSpecificOrders);

// path     GET /order/admin
// desc     Get all orders
// access   Private
router.get('/admin', checkAuth, checkIsAdmin, orderController.getAllOrders);

module.exports = router;