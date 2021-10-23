import { INIT_CATEGORY } from '../constants'

const initialState = {
  categories: [],
  shopCategories: [],
  hostCategories: [],
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INIT_CATEGORY : {
      return {
        ...state,
        categories: action.categories,
      }
    }
    default:
      return state
  }
}

export default reducer
