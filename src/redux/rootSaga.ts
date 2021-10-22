import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import authSaga from 'redux/sagas/authSaga';

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSaga() {
  yield all([authSaga()]);
}
