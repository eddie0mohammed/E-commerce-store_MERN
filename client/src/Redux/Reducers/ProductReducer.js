
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
        
        case (actionTypes.UPDATE_PRODUCT):
            const currentProduct = [...state.products].filter(elem => elem._id === action.payload.data.product._id)[0];
            const productIndex = state.products.findIndex(elem => elem._id === currentProduct._id);
            const arr = [...state.products];
            arr[productIndex] = action.payload.data.product;
            return {
                ...state,
                products: arr

            }
        

        default:
            return state
    }

}


export default productReducer;