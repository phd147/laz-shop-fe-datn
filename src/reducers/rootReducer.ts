import { cartActionType, cartInitialState, cartReducer } from './cartReducer'
import combineReducers from './combineReducers'
import { layoutActionType, layoutInitialState, layoutReducer } from './layoutReducer'
import { userReducer, userInitialState } from './userReducer'

export type rootActionType = layoutActionType | cartActionType

export const initialState = {
  layout: layoutInitialState,
  cart: cartInitialState,
  user: userInitialState,
}

export const rootReducer = combineReducers({
  layout: layoutReducer,
  cart: cartReducer,
  user: userReducer,
})
