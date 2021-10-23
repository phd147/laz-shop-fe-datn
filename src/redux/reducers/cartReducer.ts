import { INIT_CART } from '../constants'

const initialState = {
  cartList: [],
  totalPrice: 0,
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INIT_CART : {
      return {
        ...state, cartList: action.cartList,
        totalPrice: action.cartList.reduce((total: number, cartItem: { price: number; amount: number }) => {
          return total + cartItem.price * cartItem.amount
        }, 0),
      }
    }

    case 'CHANGE_QUANTITY' : {
      return {
        ...state,
      }
    }
    default:
      return state
  }
}

export default reducer
