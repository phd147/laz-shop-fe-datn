import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import cartReducer from './reducers/cartReducer'
import itemReducer from './reducers/itemReducer'
import categoryReducer from './reducers/categoryReducer'
import layoutReducer from './reducers/layoutReducer'

const combine = combineReducers({
  authReducer, cartReducer, itemReducer, categoryReducer, layoutReducer,
})

export default combine

export type RootState = ReturnType<typeof combine>;
