import { POP_UP_LOGIN } from '../constants'

const initialState = {
  isPopUpLogin: false,
}


const layoutReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case POP_UP_LOGIN :
      return {
        ...state, isPopUpLogin: !state.isPopUpLogin,
      }

    default:
      return state

  }
}


export default layoutReducer
