import axios from 'axios'
import { fetchCart } from './cart'
import { fetchGuestCart } from './sessionCart'

/**
 * ACTION TYPES
 */
const GET_CART_ITEM = 'GET_CART_ITEM'
const POST_CART_ITEM = 'POST_CART_ITEM'
const POST_SESSION_CART_ITEM = 'POST_SESSION_CART_ITEM'

/**
 * ACTION CREATORS
 */
const getCartItem = cartItem => ({ type: GET_CART_ITEM, cartItem })
const postCartItem = cartItem => ({ type: POST_CART_ITEM, cartItem })
const postCartItemToSession = cartItem => ({ type: POST_SESSION_CART_ITEM, cartItem })

/**
* THUNK CREATORS
*/
export function postCartItemToSessionThunk(cartItem) {
  return dispatch => {
    return axios.post(`/session/`, cartItem)
      .then(res => res.data)
      .then(cartItem => {
        const action = postCartItemToSession(cartItem)
        dispatch(action)
        dispatch(fetchGuestCart())
      })
      .catch(err => console.error('error creating cart item', err))
  }
}

export function postCartItemThunk(cartItem) {
  return dispatch => {
    return axios.post('/api/carts/', cartItem)
      .then(res => res.data)
      .then(cartItem => {
        const action = postCartItem(cartItem)
        dispatch(action)
        dispatch(fetchCart())
      })
      .catch(err => console.error('error creating cart item', err))
  }
}

/**
* REDUCER
*/
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case GET_CART_ITEM:
      return action.cartItem
    case POST_CART_ITEM:
      return action.cartItem
    case POST_SESSION_CART_ITEM:
      return action.cartItem
    default:
      return state
  }
}
