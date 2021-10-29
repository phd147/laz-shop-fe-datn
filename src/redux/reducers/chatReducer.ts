import { INIT_SOCKET_CLIENT } from '../constants'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  userListMessages: [],
  shopListMessages: [],
  socketClient: null,
}


const chatReducer = (state = initialState, action: any) => {

  const { payload } = action
  switch (action.type) {

    case HYDRATE :
      const { socketClient } = payload.chatReducer
      return {
        ...state,
        socketClient,
      }

    case INIT_SOCKET_CLIENT :
      return {
        ...state,
        socketClient: action.socketClient,
      }

    default:
      return state

  }
}


export default chatReducer
