import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'

import { INIT_USER_SAGA, LOGOUT, LOGOUT_SAGA } from '../constants'

import { Action } from 'redux'

function* initUser(action: Action) {
  console.log({ action })
  // yield put({
  //   type: 'INIT_USER',
  //   user: {
  //     id: 1,
  //     name: 'phd',
  //   },
  // })
}

function* logout() {
  yield put({
    type: LOGOUT,
  })
}

function* authSaga() {
  yield all([
    takeEvery(INIT_USER_SAGA, initUser), takeEvery(LOGOUT_SAGA, logout)])
}

export default authSaga
