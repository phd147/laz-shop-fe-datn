import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import cartReducer from './reducers/cartReducer'
import itemReducer from './reducers/itemReducer'
import categoryReducer from './reducers/categoryReducer'

const combine = combineReducers({
  authReducer, cartReducer, itemReducer, categoryReducer,
})

export default combine

export type RootState = ReturnType<typeof combine>;
