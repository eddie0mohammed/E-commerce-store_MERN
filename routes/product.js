
const express = require('express');

const productController = require('../controllers/productController');
const checkAuth = require('../middlewares/checkAuth');
const isAdmin = require('../middlewares/checkIsAdmin');

const router = express.Router();



// @path    POST /product/new
// @desc    Create new product
// @access  Admin
router.post('/new', checkAuth, isAdmin, productController.multerMiddleware, productController.createProduct);


// @path    PATCH /product/edit/:productId
// @desc    Update product
// @access  Admin
router.patch('/edit/:productId', checkAuth, isAdmin, productController.multerMiddleware, productController.updateProduct);


// @path    DELETE /product/delete/:productId
// @desc    Delete product
// @access  Admin
router.delete('/delete/:productId', checkAuth, isAdmin, productController.deleteProduct);


// @path    GET /product
// @desc    Get all products
// @access  Public
router.get('/', productController.getAllProducts);


// @path    GET /product/:productId
// @desc    Get specific product
// @access  Public
router.get('/:productId', productController.getSpecificProduct);

module.exports = router;