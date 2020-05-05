
import axios from 'axios';

import * as actionTypes from './ActionTypes';


export const createProduct = (name, description, price, category, quantity, productImageUrl, shipping) => async (dispatch, getState) => {

    const token = getState().auth.token;
    if (!token){
        return {
            status: 'fail'
        }
    }

    try{
        const config = {
            headers: {
                "Content-Type": 'application/json',
                'auth-token': token
            }
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', parseInt(price));
        formData.append('category', category);
        formData.append('quantity', quantity ? parseInt(quantity): 0);
        formData.append('shipping', shipping === 'yes' ? true : false);
        formData.append('image', productImageUrl);


        const res = await axios.post('/product/new', formData, config);
        console.log(res.data);

        dispatch({
            type: actionTypes.CREATE_PRODUCT,
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

export const getAllProducts = () => async (dispatch) => {

    try{
        const res = await axios.get('/product');
        console.log(res.data);

        dispatch({
            type: actionTypes.GET_ALL_PRODUCTS,
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