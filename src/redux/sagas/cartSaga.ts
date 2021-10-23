import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'

import { toast } from 'react-toastify'

import { INIT_CART_SAGA, INIT_CART } from '../constants'

import { Action } from 'redux'

import { instance } from '../../api/api'

function* initCart(action: Action) {
  console.log({ action })
  try {
    // @ts-ignore
    const res: any = yield instance.get('/cart-items')
    toast.success('ok')
    console.log({ res })
    yield put({
      type: INIT_CART,
      cartList: res.data.items,
    })
  } catch (err) {

  }


  // yield put({
  //   type: 'INIT_USER',
  //   user: {
  //     id: 1,
  //     name: 'phd',
  //   },
  // })
}

function* authSaga() {
  yield all([
    takeEvery(INIT_CART_SAGA, initCart)])
}

export default authSaga
