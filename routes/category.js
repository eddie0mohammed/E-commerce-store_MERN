
const express = require('express');

const categoryController = require('../controllers/categoryController');
const checkAuth = require('../middlewares/checkAuth');
const isAdmin = require('../middlewares/checkIsAdmin');


const router = express.Router();


// @path    POST /categories/new
// @desc    Create new category
// @access  Private + admin
router.post('/new', checkAuth, isAdmin, categoryController.newCategory);


// @path    POST /categories/edit/:categoryId
// @desc    Edit category
// @access  Private + admin
router.post('/edit/:categoryId', checkAuth, isAdmin, categoryController.updateCategory);

// @path    POST /categories/delete/:categoryId
// @desc    Delete Category
// @access  Private + admin
router.delete('/delete/:categoryId', checkAuth, isAdmin, categoryController.deleteCategory);




module.exports = router;