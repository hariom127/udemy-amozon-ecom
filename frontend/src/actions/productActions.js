import axios from 'axios';

import {
    CLEAR_ERRORS,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    } from '../constants/productConstants';

    export const getProducts = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCTS_REQUEST })
    // console.log(keyword);
            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
            const { data } = await axios.get(link)
    
            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: data
            })
    
        } catch (error) {
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload: error.response.data.message,
            })
          
        }
    } 

    export const getProductDetails = (id) => async (dispatch) => {
        try {
           
            dispatch({ type: PRODUCT_DETAILS_REQUEST })
    
            let link = `/api/v1/product/${id}`;
            const { data } = await axios.get(link)
   
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data.product
            })
    
        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response.data.message,
            })
          
        }
    } 



// clear errors
export const clearErrors = async(dispatch) => {
    dispatch({
        type:CLEAR_ERRORS 
    })
}