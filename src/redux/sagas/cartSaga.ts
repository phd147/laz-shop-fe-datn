import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'

import { toast } from 'react-toastify'

import { INIT_CART_SAGA, INIT_CART, CH, CHANGE_AMOUNT_CART_ITEM_SAGA, DELETE_CART_ITEM_SAGA } from '../constants'

import { Action } from 'redux'

import { instance } from '../../api/api'
import { ChangeAmount } from '../../constants/cart'

function* initCart(action: Action) {
  try {
    // @ts-ignore
    const res: any = yield instance.get('/cart-items')
    yield put({
      type: INIT_CART,
      cartList: res.data.rows,
    })
  } catch (err) {

  }
}


function* changeAmountCartItem(action: Action) {
  try {
    const { data } = action
    const { type, itemId, cartItemId } = data

    let res = null
    switch (type) {
      case ChangeAmount.INCREMENT :
        res = yield instance.post(`/cart-items/${itemId}`)
        break
      case ChangeAmount.DECREMENT :
        res = yield instance.patch(`/cart-items/${cartItemId}/quantity`, {
          type: ChangeAmount.DECREMENT,
        })
        break
    }
    yield put({
      type: INIT_CART,
      cartList: res.data.rows,
    })

  } catch (e) {
    console.log({ e })
    toast.error('Error')
  }
}


function* deleteCartItem(action: Action) {
  try {
    const { cartItemId } = action

    const res = yield instance.delete(`/cart-items/${cartItemId}`)
    yield put({
      type: INIT_CART,
      cartList: res.data.rows,
    })
  } catch (err) {
    toast.error('Error')
  }
}

function* authSaga() {
  yield all([
    takeEvery(INIT_CART_SAGA, initCart), takeEvery(CHANGE_AMOUNT_CART_ITEM_SAGA, changeAmountCartItem),takeEvery(DELETE_CART_ITEM_SAGA, deleteCartItem)])
}

export default authSaga
