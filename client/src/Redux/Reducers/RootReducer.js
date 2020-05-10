
import {combineReducers} from 'redux';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import categoriesReducer from './CategoryReducer';
import productReducer from './ProductReducer';
import cartReducer from './CartReducer';
import paymentReducer from './ProductReducer';
import orderReducer from './OrderReducer';

const rootReducer = combineReducers({

    auth: authReducer,
    error: errorReducer,
    categories: categoriesReducer,
    products: productReducer,
    cartReducer: cartReducer,
    payment: paymentReducer,
    orders: orderReducer

});


export default rootReducer;