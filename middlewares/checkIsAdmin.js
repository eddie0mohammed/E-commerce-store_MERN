

const User = require('../models/user');



const checkIsAdmin = async (req, res, next) => {

    try{
        //check if is authenticated
        if (!req.user){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }

        //get user
        const user = await User.findById(req.user.id);
        if (!user){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }else if (user.role !== 1){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }else{
            
            next();
        }

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}


module.exports = checkIsAdmin;