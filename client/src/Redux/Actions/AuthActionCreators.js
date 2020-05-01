
import axios from 'axios';

import * as actionTypes from './ActionTypes';



export const register = (name, email, password) => async (dispatch) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({name, email, password});

        await axios.post('/auth/register', body, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.REGISTER
        });

        return {
            status: 'success'
        }


    }catch(err){
        console.log(err.response);
        dispatch({
            type: actionTypes.ERR,
            payload: err.response.data.error
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERR
            });
        }, 3000);

        return {
            status: 'fail'
        }
    }
}


export const login = (email, password) => async (dispatch) => {

    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({email, password});

        const res = await axios.post('/auth/login', body, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.LOGIN,
            payload: res.data
        });

        return {
            status: 'success'
        }

    }catch(err){
        console.log(err.response);
        dispatch({
            type: actionTypes.ERR,
            payload: err.response.data.error
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERR
            });
        }, 3000);

        return {
            status: 'fail'
        }
    }
}

export const logout = () => {

    return {
        type: actionTypes.LOGOUT,
    }
}


export const getUser = () => async (dispatch, getState) => {

    const token = getState().auth.token;
    if (!token){
        return {
            status: 'fail'
        }
    }
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        }
        
        const res = await axios.get('/auth/getuser', config);
        console.log(res.data);

        dispatch({
            type: actionTypes.GET_USER,
            payload: res.data
        });

        
        return {
            status: 'success'
        }
        

    }catch(err){
        console.log(err.response);
        dispatch({
            type: actionTypes.ERR,
            payload: err.response.data.error
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERR
            });
        }, 3000);

        return {
            status: 'fail'
        }
    }
}