
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const sendMail = require('../utils/sendMail');

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

        //activationToken
        const activationToken = crypto.randomBytes(32).toString('hex');
        // console.log(activationToken);
        const hashedToken = crypto.createHash('sha256').update(activationToken).digest('hex');

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            activationToken: hashedToken
        });

        await newUser.save();

        //send activation email
        const activationURL = `${req.protocol}://${req.get('host')}/auth/validate/${activationToken}`;

        //send email
        await sendMail({
            // email: 'test@test.com', //mailtrap service
             email: req.body.email, //used for production
            // email: 'alperceylan52@gmail.com', //used for testing on gmail
            subject: 'ACCOUNT ACTIVATION EMAIL',
            // message: message,
            URL: activationURL,
            emailType: 'activation'
        });

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

//ACTIVATE ACCOUNT
const activateAccount = async (req, res, next) => {
    
    const token = req.params.token;
    if (!token){
        return res.status(401).json({
            status: 'fail',
            error: 'Unauthorized'
        });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    try{

        const user = await User.findOne({activationToken: hashedToken});
        if (!user){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }

        user.active = true;
        user.activationToken = null,
        await user.save();

        if (process.env.NODE_ENV === 'development'){
            return res.redirect('http://localhost:3000/auth/login');
        }
        res.redirect('/auth/login');    


    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}


//REQUEST PASSWORD RESET
const requestPasswordReset = async (req, res, next) => {

    try{
        // 1. get user based on email
        const user = await User.findOne({email: req.body.email});

        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User not found'
            });
        }

        // 2. generate random token
        //password reset Token
        const passwordResetToken = crypto.randomBytes(32).toString('hex');
        
        const hashedToken = crypto.createHash('sha256').update(passwordResetToken).digest('hex');
    
        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = Date.now() + (10 * 60 * 1000);
        await user.save({validateBeforeSave: false});

        // 3. send email
        //passwordResetURL
        const passwordResetURL = `${req.protocol}://${req.get('host')}/auth/resetPassword/${passwordResetToken}`;

        await sendMail({
            // email: 'test@test.com',
            email: req.body.email, // for production
            subject: 'PASSWORD RESET EMAIL',
            // message: message
            emailType: 'forgotPassword',
            URL: passwordResetURL
        });

        res.status(200).json({
            status: 'success',
            message: 'Password reset email sent'
        });
 

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}

// REDIRECT FROM EMAIL TO RESET PASSWORD FROM FOR PASSWORD RESET
const redirectToResetPassword = (req, res, next) => {

    const token = req.params.resetPasswordToken;

    if (process.env.NODE_ENV === 'development'){
        return res.redirect(`http://localhost:3000/auth/resetPassword/${token}`);

    }
    return res.redirect(`/auth/resetPassword/${token}`);

}


//RESET PASSWORD 
const resetPassword = async (req, res, next) => {
    
    try{

        // 1.  get user based on token
        const token = req.params.resetPasswordToken;
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({passwordResetToken: hashedToken});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: "No user found"
            });
        }

        // 2. if token has not expired, and there is user, set the new password
        if (user.passwordResetExpires < Date.now()){
            return res.status(400).json({
                status: 'fail',
                error: 'Token expired'
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // 3. update the password
        user.password = hashedPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;

        await user.save({validateBeforeSave: false});

        res.status(201).json({
            status: 'success',
            message: 'Password successfully updated',
            // user: user
        })


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

        //check if user account is activated
        if (!user.active){
            return res.status(400).json({
                status: 'fail',
                error: 'Invalid credentials'
            })
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

//RESET MY PASSWORD 
const resetMyPassword = async (req, res, next) => {

    try{
        // 1. find user by id from token
        const user = await User.findById(req.user.id);
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: "No user found"
            });
        }

        // 2. check if current password provided matches the one in db
        const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!isMatch){
            return res.status(400).json({
                status: 'fail',
                error: 'Current Password Invalid'
            });
        }

        // 3. create new hashed password
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(201).json({
            status: 'success',
            data: {
                user: user
            }
        })

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


// Get Specific User 
const getSpecificUser = async (req, res, next) => {

    try{
        const userId = req.params.userId;
        const user = await User.findOne({_id: userId});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User does not exist'
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
        return res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}


//update user
const updateUser = async (req, res, next) => {

    try{
        const userId = req.user.id;
        const user = await User.findOne({_id: userId});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'user not found'
            });
        }

        const body = {};
        if (req.body.name){
            body.name = req.body.name;
        }
        if (req.body.about){
            body.about = req.body.about;
        }
        
        const updatedUser = await User.findByIdAndUpdate(userId, body, {new: true, runValidators: true});

        res.status(201).json({
            status: 'success',
            data: {
                user: updatedUser
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
    getSpecificUser: getSpecificUser,
    updateUser: updateUser,
    activateAccount: activateAccount,
    requestPasswordReset: requestPasswordReset,
    resetPassword: resetPassword,
    redirectToResetPassword: redirectToResetPassword,
    resetMyPassword: resetMyPassword,

};