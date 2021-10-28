import { HYDRATE } from 'next-redux-wrapper'

import { INIT_USER, LOGOUT } from '../constants'


const initialState = {
  user: {},
}

const reducer = (state = initialState, action: any) => {
  const { payload } = action
  switch (action.type) {
    case HYDRATE: {
      const { user } = payload.authReducer
      const { cartList } = payload.cartReducer
      console.log('user in hydrate action ', user)
      const { user: userState } = state
      return {
        ...state,
        user: user?.id ? user : userState,
      }
    }
    case INIT_USER : {
      return {
        ...state, user: action.user,
      }
    }
    case LOGOUT : {
      return {
        ...state, user: {},
      }
    }
    default:
      return state
  }
}

export default reducer
