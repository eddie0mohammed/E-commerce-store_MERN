
import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    paymentToken: null
}

const paymentReducer = (state = initialState, action) => {

    switch(action.type){

        case (actionTypes.GET_PAYMENT_TOKEN):
            return {
                ...state,
                paymentToken: action.payload.clientToken
            }


        default:
            return state
    }
}

export default paymentReducer;