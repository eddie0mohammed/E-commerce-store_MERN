
import * as actionTypes from '../Actions/ActionTypes';


const initialState = {
    products: [],

}


const productReducer = (state = initialState, action) => {

    switch(action.type){

        case (actionTypes.GET_ALL_PRODUCTS):
            return {
                ...state,
                products: action.payload.data.products
            }

        case (actionTypes.CREATE_PRODUCT):
            const updatedProducts = [...state.products, action.payload.data.product];
            return {
                ...state,
                products: updatedProducts
                
            }
        
        case (actionTypes.DELETE_PRODUCT):
            const updatedProd = [...state.products].filter(prod => prod._id !== action.payload);
            return {
                ...state,
                products: updatedProd
            }


        default:
            return state
    }

}


export default productReducer;