
import * as actionTypes from '../Actions/ActionTypes';


const initialState = {
    orders: []
}

const orderReducer = (state = initialState, action) => {

    switch (action.type){

        case (actionTypes.CREATE_ORDER):
            return {
                ...state,
            }

        case (actionTypes.GET_USER_ORDERS):
            return {
                ...state,
                orders: action.payload.data.orders
            }

        case (actionTypes.GET_ALL_ORDERS):
            return {
                ...state,
                orders: action.payload.data.orders
            }


        default:
            return state
    }
}

export default orderReducer;