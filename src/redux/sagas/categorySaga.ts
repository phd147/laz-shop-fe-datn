import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'

import { toast } from 'react-toastify'

import { INIT_CATEGORY, INIT_CATEGORY_SAGA } from '../constants'

import { Action } from 'redux'

import { instance } from '../../api/api'

function* initCategories(action: Action) {
  console.log({ action })
  try {
    // @ts-ignore
    const res: any = yield instance.get('/products')
    yield put({
      type: INIT_CATEGORY,
      categories: res.data,
    })
  } catch (err) {
    toast.error('ERROR')
  }
}

function* authSaga() {
  yield all([
    takeEvery(INIT_CATEGORY_SAGA, initCategories)])
}

export default authSaga
