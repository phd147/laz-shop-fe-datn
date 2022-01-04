import {
  CHOOSE_ALL_CART_ITEMS,
  CLEAR_CART_ITEMS,
  INIT_CHECKOUT,
  INIT_USER,
  LOGOUT,
  RESET_CHECKOUT,
  TOGGLE_CART_ITEM,
} from '../constants'


const initialState = {
  checkoutType: null,
  addressId: null,
  cartItems: [],
  additionalComment: '',
  buyNowItem: {
    item: {},
    quantity: null,
  },
}

const reducer = (state = initialState, action: any) => {
  const { payload } = action
  switch (action.type) {
    case INIT_CHECKOUT : {

      const { data } = action

      return {
        ...state, ...data,
      }
    }

    case RESET_CHECKOUT : {
      return {
        ...initialState,
      }
    }

    case CLEAR_CART_ITEMS : {
      return {
        ...state, cartItems: [],
      }
    }

    case CHOOSE_ALL_CART_ITEMS :
      return {
        ...state,
        cartItems: action.cartItems,
      }
    case TOGGLE_CART_ITEM :

      const { checked, id } = action

      const newCartItems = checked ? state.cartItems.concat(id, ...state.cartItems) : state.cartItems.filter(cartItemId => cartItemId !== id)

      return {
        ...state,
        cartItems: [...new Set(newCartItems)],
      }
    default:
      return state
  }
}

export default reducer
