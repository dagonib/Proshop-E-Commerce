import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    console.log(order)
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