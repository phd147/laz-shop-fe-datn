import { all } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import authSaga from 'redux/sagas/authSaga'
import cartSaga from 'redux/sagas/cartSaga'
import itemSaga from 'redux/sagas/itemSaga'
import categorySaga from 'redux/sagas/categorySaga'

export const sagaMiddleware = createSagaMiddleware()

export default function* rootSaga() {
  yield all([authSaga(), cartSaga(), itemSaga(), categorySaga()])
}
