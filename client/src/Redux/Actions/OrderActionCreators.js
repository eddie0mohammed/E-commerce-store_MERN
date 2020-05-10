
import axios from 'axios';

import * as actionTypes from './ActionTypes';


export const createOrder = (orderData) => async (dispatch, getState) => {

    const token = getState().auth.token;
    if (!token){
        console.log('unauthorized');
        return {
            status: 'fail'
        }
    }
    // console.log(orderData);

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        }

        const body = JSON.stringify({order: orderData});

        await axios.post('/order/new', body, config);
        // console.log(res);

        // dispatch({
        //     type: actionTypes.CREATE_ORDER,
        //     // payload: res.data
        // });

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


export const getUserOrders = () => async (dispatch, getState) => {

    const token = getState().auth.token;
    if (!token){
        console.log('unauthorized');
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

        const res = await axios.get('/order/user', config);
        console.log(res.data);

        dispatch({
            type: actionTypes.GET_USER_ORDERS,
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

export const getAllOrders = () => async (dispatch, getState) => {

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

        const res = await axios.get('/order/admin', config);
        console.log(res);

        dispatch({
            type: actionTypes.GET_ALL_ORDERS,
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