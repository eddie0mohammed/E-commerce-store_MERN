

const {Order} = require('../models/order');
const {CartItem} = require('../models/order');





//create new order
const createOrder = async (req, res, next) => {

    try{
        req.body.order.user = req.user.id;
        // console.log(req.body.order);
        const order = new Order(req.body.order);

        await order.save();

        res.status(200).json({
            status: 'success',
            data: {
                order: order
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


//get userspecific orders
const getUserSpecificOrders = async (req, res, next) => {

    try{
        const orders = await Order.find({user: req.user.id});

        res.status(200).json({
            status: 'success',
            data: {
                orders: orders
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



const getAllOrders = async (req, res, next) => {

    try{

        const orders = await Order.find();

        res.status(200).json({
            status: 'success',
            data: {
                orders: orders
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






module.exports = {
    createOrder: createOrder,
    getUserSpecificOrders: getUserSpecificOrders,
    getAllOrders: getAllOrders,
    
}