import { authConstants } from '../constants/auth'
import { REQUEST, SUCCESS, FAILURE } from '../constants'
// import { Action } from 'types/action';
// import { AuthReducer, UserInfo } from 'types/author';
import { HYDRATE } from 'next-redux-wrapper'
// import { RouterPath } from 'shared/constant/common';

const initialState = {
  user: {},
}

const reducer = (state = initialState, action: any) => {
  const { payload } = action
  switch (action.type) {
    case HYDRATE: {
      const { user } = payload.authReducer
      console.log({user})
      const { user: userState } = state
      return {
        ...state,
        user: user?.id ? user : userState,
      }
    }
    case 'INIT_USER_SAGA' : {
      return {
        ...state, user: action.user,
      }
    }
    default:
      return state
  }
}

export default reducer
