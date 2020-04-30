
const express = require('express');

const categoryController = require('../controllers/categoryController');
const checkAuth = require('../middlewares/checkAuth');
const isAdmin = require('../middlewares/checkIsAdmin');


const router = express.Router();


// @path    POST /categories/new
// @desc    Create new category
// @access  Private + admin
router.post('/new', checkAuth, isAdmin, categoryController.newCategory);


// @path    PATCH /categories/edit/:categoryId
// @desc    Edit category
// @access  Private + admin
router.patch('/edit/:categoryId', checkAuth, isAdmin, categoryController.updateCategory);

// @path    DELETE /categories/delete/:categoryId
// @desc    Delete Category
// @access  Private + admin
router.delete('/delete/:categoryId', checkAuth, isAdmin, categoryController.deleteCategory);


// @path    GET /categories
// @desc    Get all categories
// @access  Public
router.get('/', categoryController.getAllCategories);




module.exports = router;