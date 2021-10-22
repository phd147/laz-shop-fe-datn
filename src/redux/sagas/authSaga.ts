import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'

import { Action } from 'redux'

function* initUser(action: Action) {
  yield put({
    type : 'INIT_USER_SAGA',
    user : {
      id : 1,
      name : 'phd'
    }
  })
}

function* authSaga() {
  yield all([
    takeEvery('INIT_USER', initUser)])
}

export default authSaga
