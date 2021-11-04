import {
  CHANGE_SHOP_CHAT_HEADER_INFO,
  CHANGE_USER_CHAT_HEADER_INFO,
  CHAT_WITH_SHOP, CHAT_WITH_SHOP_SUCCESS, CHAT_WITH_USER, CHAT_WITH_USER_SUCCESS,
  INIT_SOCKET_CLIENT,
} from '../constants'
import { HYDRATE } from 'next-redux-wrapper'

interface Receiver {
  id: number
  type: string
  name: string
  avatar: string
}

interface Sender {
  id: number
  type: string
  name: string
  avatar: string
}

const initialState = {
  // userConversationList: [],
  // shopConversationLIst: [],
  // shopListMessages: [],
  socketClient: null,
  user: {
    currentHeaderInfo: null,
    conversationList: [],
    messageList: {},
  },
  shop: {
    currentHeaderInfo: null,
    conversationList: [],
    messageList: {},
  },
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
    case CHANGE_USER_CHAT_HEADER_INFO:
      const newUser = {
        ...state.user,
      }
      newUser.currentHeaderInfo = action.currentHeaderInfo

      return {
        ...state,
        user: newUser,
      }

    case CHANGE_SHOP_CHAT_HEADER_INFO:
      const newShopHeader = {
        ...state.shop,
      }
      newShopHeader.currentHeaderInfo = action.currentHeaderInfo

      return {
        ...state,
        shop: newShopHeader,
      }

    case CHAT_WITH_SHOP:

      const incommingMessage = action.data

      const newConversationList = [...state.shop.conversationList]
      const isInConversationList = newConversationList.findIndex(message => {
        return message.sender.queryId === incommingMessage.sender.queryId || message.receiver.queryId === incommingMessage.sender.queryId
      })
      const newShop = { ...state.shop }

      if (isInConversationList < 0) {
        newShop.conversationList.unshift(incommingMessage)
      } else {
        newShop.conversationList[isInConversationList] = incommingMessage
      }
      newShop.messageList[incommingMessage.sender.queryId] = newShop.messageList[incommingMessage.sender.queryId] || []
      newShop.messageList[incommingMessage.sender.queryId].push(incommingMessage)
      return {
        ...state, shop: newShop,
      }

    case CHAT_WITH_USER:
      const incommingMessageShop = action.data
      console.log({ incommingMessageShop })
      const newConversationListUser = [...state.user.conversationList]
      const isInConversationListUser = newConversationListUser.findIndex(message => {
        return message.sender.queryId === incommingMessageShop.sender.queryId || message.receiver.queryId === incommingMessageShop.sender.queryId
      })
      const newUser1 = { ...state.user }

      console.log({ isInConversationListUser })

      if (isInConversationListUser < 0) {
        newUser1.conversationList.unshift(incommingMessageShop)
      } else {
        newUser1.conversationList[isInConversationListUser] = incommingMessageShop
      }
      newUser1.messageList[incommingMessageShop.sender.queryId] = newUser1.messageList[incommingMessageShop.sender.queryId] || []
      newUser1.messageList[incommingMessageShop.sender.queryId].push(incommingMessageShop)
      return {
        ...state, user: newUser1,
      }

    case CHAT_WITH_SHOP_SUCCESS :
      const sendMessage = action.data
      const newUser2 = { ...state.user }
      newUser2.messageList[sendMessage.receiver.queryId] = newUser2.messageList[sendMessage.receiver.queryId] || []
      newUser2.messageList[sendMessage.receiver.queryId].push(sendMessage)
      return {
        ...state, user: newUser2,
      }

    case CHAT_WITH_USER_SUCCESS :
      const sendMessage1 = action.data
      const newShop2 = { ...state.shop }
      newShop2.messageList[sendMessage1.receiver.queryId] = newShop2.messageList[sendMessage1.receiver.queryId] || []
      newShop2.messageList[sendMessage1.receiver.queryId].push(sendMessage1)
      return {
        ...state, shop: newShop2,
      }


    case 'INIT_CONVERSATION_WITH_SHOP' :

      const newUser3 = { ...state.user }

      const shop = action.shop

      const newConversationListUser1 = [...state.user.conversationList]
      const isInConversationListUser1 = newConversationListUser1.findIndex(message => {
        return message.sender.queryId === `SHOP_${shop.id}` || message.receiver.queryId === `SHOP_${shop.id}`
      })
      if (isInConversationListUser1 < 0) {
        newUser3.conversationList.push({
          sender: {
            type: 'USER',
          },
          receiver: {
            id: shop.id,
            type: 'SHOP',
            avatarUrl: shop.avatarUrl,
            name: shop.name,
            queryId: `SHOP_${shop.id}`,
          },
        })
      }
      return {
        ...state, user: newUser3,
      }

    default:
      return state
  }
}


export default chatReducer
