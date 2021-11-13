import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import cartReducer from './reducers/cartReducer'
import itemReducer from './reducers/itemReducer'
import categoryReducer from './reducers/categoryReducer'
import layoutReducer from './reducers/layoutReducer'
import chatReducer from './reducers/chatReducer'
import checkoutReducer from './reducers/checkoutReducer'

const combine = combineReducers({
  authReducer, cartReducer, itemReducer, categoryReducer, layoutReducer, chatReducer,checkoutReducer
})

export default combine

export type RootState = ReturnType<typeof combine>;
