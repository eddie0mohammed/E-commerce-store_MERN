
import * as actionTypes from './ActionTypes';


export const addToCart = (product) => {
    // console.log(product);
    return {
        type: actionTypes.ADD_TO_CART,
        payload: product
    }
}


export const inc = (productId) => {
    return {
        type: actionTypes.INC,
        payload: productId
    }
}

export const dec = (productId) => {
    return {
        type: actionTypes.DEC,
        payload: productId
    }
}

export const removeItem = (productId) => {
    return {
        type: actionTypes.REMOVE,
        payload: productId
    }
}

export const clearCartItems = () => {
    return {
        type: actionTypes.CLEAR_CART_ITEMS
    }
}