import { INIT_CART } from '../constants'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  cartList: [],
  totalPrice: 0,
}

const reducer = (state = initialState, action: any) => {
  const { payload } = action
  switch (action.type) {

    case HYDRATE: {
      const { cartList } = payload.cartReducer
      return {
        ...state, cartList,
        totalPrice: cartList.reduce((total: number, cartItem: any) => {
          total = total + cartItem.item.price * cartItem.quantity
          return total
        }, 0),
      }
    }

    case INIT_CART : {
      console.log('init cartttttt ')
      return {
        ...state, cartList: action.cartList,
        totalPrice: action.cartList.reduce((total: number, cartItem: any) => {
          total = total + cartItem.item.price * cartItem.quantity
          return total
        }, 0),
      }
    }
    default:
      return state
  }
}

export default reducer
