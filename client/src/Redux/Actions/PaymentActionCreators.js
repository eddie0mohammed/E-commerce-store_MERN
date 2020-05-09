
import axios from 'axios';

import * as actionTypes from './ActionTypes';


export const getPaymentToken = () => async (dispatch, getState) => {

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

        const res = await axios.get('/payment/getToken', config);
        // console.log(res);

        // dispatch({
        //     type: actionTypes.GET_PAYMENT_TOKEN,
        //     payload: res.data
        // });

        return res.data

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

export const processPayment = (paymentData) => async (dispatch, getState) => {

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

        const body = JSON.stringify({paymentData});

        const res = await axios.post('/payment/processPayment', body, config);
        // console.log(res.data);

        // dispatch({
        //     type: actionTypes.GET_PAYMENT_TOKEN,
        //     payload: res.data
        // });

        return res.data

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