
import axios from 'axios';

import * as actionTypes from './ActionTypes';


export const createCategory = (name) => async (dispatch, getState) => {

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

        const body = JSON.stringify({name});

        const res = await axios.post('/categories/new', body, config);
        console.log(res.data);

        dispatch({
            type: actionTypes.ADD_CATEGORY,
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


export const getAllCategories = () => async (dispatch) => {

    try{
        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        }

        const res = await axios.get('/categories', config);
        console.log(res.data);

        dispatch({
            type: actionTypes.GET_CATEGORIES,
            payload: res.data
        });

        return {
            status: 'success'
        }

    }catch(err){
        console.log(err);
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


export const deleteCategory = (id) => async (dispatch, getState) => {

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

        const res = await axios.delete(`/categories/delete/${id}`, config);
        console.log(res.data);

        dispatch({
            type: actionTypes.DELETE_CATEGORY,
            payload: id
        });

        return {
            status: 'success'
        }

    }catch(err){
        console.log(err);
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