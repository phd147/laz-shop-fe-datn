import { INIT_CHECKOUT, INIT_USER, LOGOUT, RESET_CHECKOUT } from '../constants'


const initialState = {
  checkoutType: null,
  addressId: null,
  cartItems: [],
  additionalComment: '',
    buyNowItem: {
    itemId: null,
    quantity: null,
  },
}

const reducer = (state = initialState, action: any) => {
  const { payload } = action
  switch (action.type) {
    case INIT_CHECKOUT : {

      const { data } = action

      return {
        ...state, ...data
      }
    }

    case RESET_CHECKOUT : {
      return {
        ...initialState
      }
    }

    default:
      return state
  }
}

export default reducer
