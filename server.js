

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


const authRouter = require('./routes/auth');


const app = express();


//DB
const DB = process.env.MONGODB_URI;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('successfully connected to DB'))
.catch((err) => console.log(err));



//MIDDLEWARES
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//Routes
app.use('/auth', authRouter);






const PORT = 8080;
app.listen(PORT, () => {
    console.log('server listening on port ', PORT);
});
