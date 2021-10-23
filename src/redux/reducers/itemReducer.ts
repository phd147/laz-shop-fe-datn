import { INIT_GENERAL_ITEM } from '../constants'

const initialState = {
  generalItem: [],
  recommendedItem: [],
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INIT_GENERAL_ITEM : {
      return {
        ...state,
        generalItem: action.generalItem,
      }
    }
    default:
      return state
  }
}

export default reducer
