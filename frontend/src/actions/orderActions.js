import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })

        // Obtener los datos del usuario
        const { userLogin: { userInfo } } = getState()
        // Establecer los headers con el content-type y la autorización
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // Post Request to a la tabla orders
        const { data } = await axios.post(`/api/orders`, order, config)
      
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        // Obtener los datos del usuario
        const { userLogin: { userInfo } } = getState()
        // Establecer los headers con el content-type y la autorización
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // Post Request to a la tabla orders
        const { data } = await axios.get(`/api/orders/${id}`, config)
      
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    
    try {
        dispatch({ type: ORDER_PAY_REQUEST })

        // Obtener los datos del usuario
        const { userLogin: { userInfo } } = getState()
        // Establecer los headers con el content-type y la autorización
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // Post Request to a la tabla orders
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
      
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST })

        // Obtener los datos del usuario
        const { userLogin: { userInfo } } = getState()

        // Establecer los headers con el content-type y la autorización
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // Post Request to a la tabla orders
        const { data } = await axios.get(`/api/orders/myorders`, config)
      
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}