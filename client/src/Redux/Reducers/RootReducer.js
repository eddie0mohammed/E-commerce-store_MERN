
import {combineReducers} from 'redux';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import categoriesReducer from './CategoryReducer';


const rootReducer = combineReducers({

    auth: authReducer,
    error: errorReducer,
    categories: categoriesReducer,

});


export default rootReducer;