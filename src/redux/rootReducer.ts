import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

const combine = combineReducers({
  authReducer,
});

export default combine;

export type RootState = ReturnType<typeof combine>;
