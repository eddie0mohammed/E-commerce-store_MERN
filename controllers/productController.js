
const Product = require('../models/product');


const createProduct = async (req, res, next) => {

    //validate
    const {name, description, price, category} = req.body;
    if (!name || !description || !price || !category){
        return res.status(400).json({
            status: 'fail',
            error: 'Name, description, price and category required'
        });
    }
    try{

        const exists = await Product.findOne({name: name});
        if (exists){
            return res.status(400).json({
                status: 'fail',
                error: 'Product name exists in Db'
            });
        }

        const newProduct = new Product({
            name: name,
            description: description,
            price: price,
            category: category
        });
        
        if (req.body.quantity){
            newProduct.quatity = req.body.quantity;
        }
        if (req.body.shipping){
            newProduct.shipping = req.body.shipping;
        }

        await newProduct.save()
        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct
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



const updateProduct = async (req, res, next) => {

    const productId = req.params.productId;

    try{
        const exists = await Product.findById(productId);
        if (!exists){
            return res.status(400).json({
                status: 'fail',
                error: 'Product does not exist'
            });
        }

        const body = {};
        if (req.body.name){
            body.name = req.body.name;
        }
        if (req.body.description){
            body.description = req.body.description;
        }
        if (req.body.price){
            body.price = req.body.price;
        }
        if (req.body.category){
            body.category = req.body.category;
        }
        if (req.body.quantity){
            body.quantity = req.body.quantity;
        }
        if (req.body.shipping){
            body.shipping = req.body.shipping;
        }


        const updatedProduct = await Product.findByIdAndUpdate(productId, body, {new: true, runValidators: true});

        res.status(201).json({
            status: 'success',
            data: {
                product: updatedProduct
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


const deleteProduct = async (req, res, next) => {

    try{
        const productId = req.params.productId;
        const exists = await Product.findById(productId);
        if (!exists){
            return res.status(400).json({
                status: 'fail',
                error: "Product does not exist"
            });
        }

        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted product'
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
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,

}