import FlexBox from '@component/FlexBox'
import CheckoutNavLayout from '@component/layout/CheckoutNavLayout'
import ProductCard7 from '@component/product-cards/ProductCard7'
import { Span } from '@component/Typography'
import { useAppContext } from '@context/app/AppContext'
import countryList from '@data/countryList'
import {
  Autocomplete,
  Button,
  Card,
  Divider, FormGroup,
  Grid,
  MenuItem,
  TextField,
} from '@material-ui/core'
import { CartItem } from '@reducer/cartReducer'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import {
  CHOOSE_ALL_CART_ITEMS,
  CLEAR_CART_ITEMS,
  DELETE_CART_ITEM_SAGA,
  INIT_CART,
  INIT_CHECKOUT,
} from '../src/redux/constants'

import { CheckoutType } from '../src/constants/cart'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Checkbox, FormControlLabel } from '@mui/material'
import checkoutReducer from '../src/redux/reducers/checkoutReducer'


import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CustomDialog from '@component/CustomDialog'
import { toast } from 'react-toastify'
import { instance } from '../src/api/api'

const Cart = () => {

  const router = useRouter()

  const dispatch = useDispatch()
  const { cartList } = useSelector(state => state.cartReducer)

  const [additionalComment, setAdditionalComment] = useState('')

  let { cartItems, checkoutType } = useSelector(state => state.checkoutReducer)

  cartItems = cartList.filter(cartItem => cartItems.includes(cartItem.id)).map(cartItem => cartItem.id);

  const checked = cartItems.length && cartItems.length === cartList.length

  const totalPrice = cartList.filter(cartItem => cartItems.includes(cartItem.id)).reduce((total, cartItem) => total + cartItem.quantity * cartItem.item.price, 0);


  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = async () => {
    try {
        const res = await instance.delete('/cart-items', {
          data : {
            cartItems
          }
        });
        dispatch({
          type : INIT_CART,
          cartList : res.data.rows
        })
        setOpen(false);
    }catch(err){
      toast.error(err.response?.data?.message);
    }
  }


  const checkoutHandler = () => {
    dispatch({
      type: INIT_CHECKOUT,
      data: {
        checkoutType: CheckoutType.CART,
        // cartItems: cartList.map(cartItem => cartItem.id),
        additionalComment: additionalComment,
      },
    })
    router.push('/checkout')
  }


  const chooseAllCartItemHandler = (e) => {
    const checked = e.target.checked
    if (checked) {
      dispatch({
        type: CHOOSE_ALL_CART_ITEMS,
        cartItems: cartList.map(cartItem => cartItem.id),
      })
      return
    }
    dispatch({
      type: CLEAR_CART_ITEMS,
    })
  }
  return (
    <CheckoutNavLayout>

      <Grid container spacing={3}>
        {
          cartList.length ? <>
            <Grid item lg={8} md={8} xs={12}>
              <Checkbox
                checked={checked}
                onChange={(e) => chooseAllCartItemHandler(e)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <span >Choose all cart items</span>
              <CustomDialog handleClose={handleClose} submitHandler={handleSubmit} open={open} title={'Remove from cart'} content={'Are you sure?'}/>
              { cartItems.length ? <DeleteOutlineIcon onClick={() => setOpen(true)} style={{cursor : 'pointer',float : 'right'}}/> : null}
              {cartList.map((item) => (
                <ProductCard7 key={item.id} {...item} />
              ))}
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Card
                sx={{
                  padding: '1.5rem 1.75rem',
                  '@media only screen and (max-width: 678px)': {
                    padding: '1rem',
                  },
                }}
              >
                <FlexBox justifyContent='space-between' alignItems='center' mb={2}>
                  <Span color='grey.600'>Total:</Span>
                  <FlexBox alignItems='flex-end'>
                    <Span fontSize='18px' fontWeight='600' lineHeight='1'>
                      ${totalPrice.toFixed(2)}
                    </Span>
                    <Span fontWeight='600' fontSize='14px' lineHeight='1'>
                      00
                    </Span>
                  </FlexBox>
                </FlexBox>

                <Divider sx={{ mb: '1rem' }} />

                {/*<FlexBox alignItems='center' mb={2}>*/}
                {/*  <Span fontWeight='600' mr={1.25}>*/}
                {/*    Additional Comments*/}
                {/*  </Span>*/}
                {/*  <Span*/}
                {/*    fontSize='12px'*/}
                {/*    color='primary.main'*/}
                {/*    lineHeight='1'*/}
                {/*    p='6px 10px'*/}
                {/*    bgcolor='primary.light'*/}
                {/*    borderRadius='3px'*/}
                {/*  >*/}
                {/*    Note*/}
                {/*  </Span>*/}
                {/*</FlexBox>*/}

                {/*<TextField*/}
                {/*  variant='outlined'*/}
                {/*  rows={6}*/}
                {/*  fullWidth*/}
                {/*  multiline*/}
                {/*  sx={{ mb: '1rem' }}*/}
                {/*  onChange={(e) => setAdditionalComment(e.target.value)}*/}
                {/*/>*/}

                {/*<Divider sx={{ mb: '1rem' }} />*/}

                {/*<TextField*/}
                {/*  label='Voucher'*/}
                {/*  placeholder='Voucher'*/}
                {/*  size='small'*/}
                {/*  variant='outlined'*/}
                {/*  fullWidth*/}
                {/*/>*/}

                {/*<Button*/}
                {/*  variant='outlined'*/}
                {/*  color='primary'*/}
                {/*  fullWidth*/}
                {/*  sx={{*/}
                {/*    mt: '1rem',*/}
                {/*    mb: '30px',*/}
                {/*  }}*/}
                {/*>*/}
                {/*  Apply Voucher*/}
                {/*</Button>*/}

                {/*<Divider sx={{ mb: '1rem' }} />*/}

                <Button disabled={ !cartItems.length } onClick={checkoutHandler} variant='contained' color='primary' fullWidth>
                  Checkout Now
                </Button>

              </Card>
            </Grid>
          </> : <FlexBox  sx={{ width : '100%', align: "center" }} justifyContent={'center'} flexDirection={'column'}>
            <h3>No items in cart</h3>
            <Link href={'/'}>
              <Button sx={{width : '200px'}} variant={'contained'} color={'warning'}>
                Keep shopping
              </Button>
            </Link>
          </FlexBox>
        }

      </Grid>
    </CheckoutNavLayout>
  )
}

const stateList = [
  {
    value: 'New York',
    label: 'New York',
  },
  {
    value: 'Chicago',
    label: 'Chicago',
  },
]

export default Cart
