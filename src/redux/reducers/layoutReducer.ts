import { POP_UP_LOGIN, TOGGLE_SHOW_CHAT } from '../constants'

const initialState = {
  isPopUpLogin: false,
  isShowChat: false,
}


const layoutReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case POP_UP_LOGIN :
      return {
        ...state, isPopUpLogin: !state.isPopUpLogin,
      }

    case TOGGLE_SHOW_CHAT :
      return {
        ...state, isShowChat: !state.isShowChat,
      }

    default:
      return state

  }
}


export default layoutReducer
