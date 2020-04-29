

const Category = require('../models/category');



const newCategory = async (req, res, next) => {

    //validate
    const {name} = req.body;
    if (!name){
        return res.status(400).json({
            status: 'fail',
            error: 'Category name is required'
        });
    }

    try{

        //check if category name exists
        const exists = await Category.findOne({name: req.body.name});
        if (exists){
            return res.status(400).json({
                status: 'fail',
                error: 'Category name exits'
            });
        }
        const newCategory = new Category({
            name: req.body.name
        });

        await newCategory.save();

        res.status(201).json({
            status: 'success',
            data: {
                category: newCategory
            }
        });


    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}


const updateCategory = async (req, res, next) => {

    const categoryId = req.params.categoryId;

    const name = req.body.name;
    if (!name){
        return res.status(400).json({
            status: 'fail',
            error: 'Category name is required'
        });
    }

    try{
        const exists = await Category.findById(categoryId);
        if (!exists){
            return res.status(400).json({
                status: 'fail',
                error: 'Category not found'
            });
        }

        const body = {name: req.body.name};
        const updatedCategory = await Category.findByIdAndUpdate(category, body, {new: true, runValidators: true});

        res.status(201).json({
            status: 'success',
            data: {
                category: updatedCategory
            }
        });
        

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}


const deleteCategory = async (req, res, next) => {

    try{
        const categoryId = req.params.categoryId;
        const exists = await Category.findById(categoryId);
        if (!exists){
            return res.status(400).json({
                status: 'fail',
                error: 'Category does not exist'
            });
        }

        await Category.findByIdAndDelete(categoryId);
        res.status(200).json({
            status: 'success',
            message: 'successfully deleted category'
        });

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}




module.exports = {

    newCategory: newCategory,
    updateCategory: updateCategory,
    deleteCategory:  deleteCategory,
}