
import * as actionTypes from '../Actions/ActionTypes';


const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,


}


const authReducer = (state = initialState, action) => {

    switch (action.type){

        case (actionTypes.REGISTER):
            return {
                ...state
            }

        case (actionTypes.LOGIN):
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.data.user,
                token: action.payload.token,
                isAuthenticated: true
            }

        case (actionTypes.LOGOUT):
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false
            }

        case (actionTypes.GET_USER):
            return {
                ...state,
                user: action.payload.data.user
            }

        case (actionTypes.REQUEST_PASS_RESET):
            return {
                ...state
            }

        case (actionTypes.RESET_PASS):
            return {
                ...state
            }

        case (actionTypes.RESET_MY_PASS):
            return {
                ...state
            }

        default:
            return state
    }
}

export default authReducer;