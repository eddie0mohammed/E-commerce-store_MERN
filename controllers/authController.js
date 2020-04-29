
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');



//REGISTER
const register = async (req, res, next) => {

    //validate
    const {name, email, password} = req.body;
    
    if (!name || !email || !password){
        return res.status(400).json({
            status: 'fail',
            error: 'Name, email and password required'
        });
    }

    try{
        //check if email exists already in DB
        const exists = await User.findOne({email: req.body.email});
        if (exists){
            return res.status(400).json({
                status: 'fail',
                error: 'Email already exists in DB'
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            status: 'success',
            message: 'New user successfully created',
            data: {
                user: newUser
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


//LOGIN

const login = async (req, res, next) => {

    //validate
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({
            status: 'fail',
            error: 'Email and password required'
        });
    }

    try{
        //check if user exists
        const user = await User.findOne({email: email});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'Invalid credentials'
            });
        }

        //check password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch){
            return res.status(400).json({
                status: 'fail',
                error: 'Invalid credentials'
            });
        }

        //token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 3600});
        //include token in header
        res.header('auth-token', token);

        res.status(200).json({
            status: 'success',
            token: token,
            data: {
                user: user
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


//getUser
const getUser = async (req, res, next) => {

    try{
        if (!req.user){
            return res.status(400).json({
                status: 'fail',
                error: 'Unauthorized'
            })
        }

        const user = await User.findById(req.user.id);
        if (!user){
            return res.status(401).json({
                status: 'fail', 
                error: 'Unauthorized'
            });    
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
        });

    }catch(err){
        console.log(err);
        res.status(401).json({
            status: 'fail', 
            error: err
        });
    }
}

//GET ALL USERS
const getAllUsers = async (req, res, next) => {

    try{
        const users = await User.find();
        if (!users){
            return res.status(400).json({
                status: 'fail',
                error: 'Error'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                users: users
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
    register: register,
    login: login,
    getUser: getUser,
    getAllUsers: getAllUsers,

};