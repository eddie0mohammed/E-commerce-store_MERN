
import * as actionTypes from '../Actions/ActionTypes';


const initialState = {

    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],

}

const cartReducer = (state = initialState, action) => {

    switch(action.type){

        case (actionTypes.ADD_TO_CART):
            // console.log(action.payload);
            const newCart = saveInLocalStorage(action.payload);
            return {
                ...state,
                cartItems: newCart
            }
        
        case (actionTypes.INC):
            const updatedCart = increase(action.payload);
            return {
                ...state,
                cartItems: updatedCart
            }

        case (actionTypes.DEC):
            const updateCart = decrease(action.payload);
            return {
                ...state,
                cartItems: updateCart
            }

        case (actionTypes.REMOVE):
            const updatCart = removeItem(action.payload);
            return {
                ...state,
                cartItems: updatCart
            }


        default: 
            return state
    }
}

export default cartReducer;




const saveInLocalStorage = (product) => {

    //get items from local storage
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

    //add item to cartItems
    //check if cartItems contain product already => if yes, update count, else add item
    let index = cartItems.findIndex(elem => elem._id === product._id);
    // console.log(index);
    if (index !== -1 ){
        cartItems[index].sold = cartItems[index].sold + 1

    }else{
        product.sold = 1;
        cartItems.push(product);

    }

    //add updated cartItems to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    return cartItems;
}


const increase = (productId) => {

    const cartItems = JSON.parse(localStorage.getItem('cartItems'));

    let index = cartItems.findIndex(elem => elem._id === productId);
    cartItems[index].sold = cartItems[index].sold + 1
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    return cartItems;
}


const decrease = (productId) => {

    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let index = cartItems.findIndex(elem => elem._id === productId);

    if (cartItems[index].sold > 1){
        cartItems[index].sold = cartItems[index].sold - 1
    }else{
        cartItems = cartItems.filter((elem, i) => i !== index);  
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    return cartItems;

    
}


const removeItem = (productId) => {

    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    cartItems = cartItems.filter(elem => elem._id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    return cartItems;
}