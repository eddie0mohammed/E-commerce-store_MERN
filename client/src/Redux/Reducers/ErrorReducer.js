
import * as actionTypes from '../Actions/ActionTypes';


const initalState = {
    error: ''
}


const errorReducer = (state = initalState, action) => {

    switch (action.type){

        case (actionTypes.ERR):
            return {
                ...state,
                error: action.payload
            }

        case (actionTypes.CLEAR_ERR):
            return {
                ...state,
                error: ''
            }


        default:
            return state
    }
}

export default errorReducer;