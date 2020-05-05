
import {combineReducers} from 'redux';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import categoriesReducer from './CategoryReducer';
import productReducer from './ProductReducer';


const rootReducer = combineReducers({

    auth: authReducer,
    error: errorReducer,
    categories: categoriesReducer,
    products: productReducer,

});


export default rootReducer;