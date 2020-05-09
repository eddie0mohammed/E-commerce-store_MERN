

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const paymentRouter = require('./routes/payment');

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
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//Serve Static File
app.use('/images' , express.static(path.join(__dirname, 'public', 'productImages')));


//Routes
app.use('/auth', authRouter);
app.use('/categories', categoryRouter);
app.use('/product', productRouter);
app.use('/payment', paymentRouter);





const PORT = 8080;
app.listen(PORT, () => {
    console.log('server listening on port ', PORT);
});
