
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





module.exports = router;