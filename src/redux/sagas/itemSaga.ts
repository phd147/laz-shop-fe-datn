import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'

import { toast } from 'react-toastify'

import { INIT_GENERAL_ITEM, INIT_GENERAL_ITEM_SAGA } from '../constants'

import { Action } from 'redux'

import { instance } from '../../api/api'

function* initGeneralItem(action: Action) {
  console.log({ action })
  try {
    // @ts-ignore
    const res: any = yield instance.get(`/items?limit=${action.perPage}&page=${action.currentPage}`)
    action.setLastPage(res.data.last_page)
    yield put({
      type: INIT_GENERAL_ITEM,
      generalItem: res.data.items,
    })
  } catch (err) {
    toast.error('Some thing went wrong')
  }
}

function* authSaga() {
  yield all([
    takeEvery(INIT_GENERAL_ITEM_SAGA, initGeneralItem)])
}

export default authSaga
