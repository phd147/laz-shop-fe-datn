import Card1 from '@component/Card1'
import FlexBox from '@component/FlexBox'
import { H6, Paragraph } from '@component/Typography'

import { PayPalButton } from 'react-paypal-button-v2'

import {
  Avatar,
  Button,
  Card,
  Grid,
  MenuItem, Pagination,
  TextField,
  Typography,
} from '@material-ui/core'
import { Box } from '@material-ui/system'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { instance } from '../../api/api'
import { toast } from 'react-toastify'
import { CheckoutType } from '../../constants/cart'
import { useDispatch, useSelector } from 'react-redux'
import { INIT_CHECKOUT, RESET_CHECKOUT } from '../../redux/constants'

import { Add } from '@material-ui/icons'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import AddressEditor from '@component/address/AddressEditor'

type DateProps = {
  label: string
  value: string
}

enum PaymentType {
  ZALO_PAY = 'ZALO_PAY',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

const CheckoutForm2 = ({ additionalComment }) => {

  const [open, setOpen] = React.useState(false)
  const [userBalance, setUserBalance] = useState(0)

  const getUserBalance = async () => {
    try {
      const res = await instance.get('/balance/user');
      setUserBalance(res.data.balance)
    }catch(err){
      toast.error('Error');
    }
  }

  const handleCoinDiscountChange = e => {
    setCoinDiscount(e.target.value);
  }

  useEffect(() => {
    getUserBalance();
  },[])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [hasVoucher, setHasVoucher] = useState(false)
  const router = useRouter()

  const dispatch = useDispatch()

  let { checkoutType, cartItems, buyNowItem } = useSelector(state => state.checkoutReducer)

  const [paymentType, setPaymentType] = useState(null)
  const [addressId, setAddressId] = useState(null)
  const [coinDiscount,setCoinDiscount] = useState(0);

  const { cartList } = useSelector(state => state.cartReducer)


  cartItems = cartList.filter(cartItem => cartItems.includes(cartItem.id)).map(cartItem => cartItem.id)

  const checkoutItems = cartList.filter(cartItem => cartItems.includes(cartItem.id))

  const changeAddressHandler = () => {
    // TODO : fetch shipping fee and expected delivery time of each cart item
  }


  const handleFormSubmit = async (values: any) => {
    console.log(values)

    try {

      const data = {
        paymentType: paymentType,
        checkoutType: checkoutType,
        addressId: addressId,
        additionalComment,
      }

      if (checkoutType === CheckoutType.CART) {
        data.cartItems = cartItems
      }
      if (checkoutType === CheckoutType.BUYNOW) {
        data.buyNowItem = {
          id: buyNowItem.item.id,
          quantity: buyNowItem.quantity,
        }
      }


    } catch (err) {
      toast.error('Error')
    }
    // router.push('/payment')
  }

  const handleFieldValueChange =
    (value: string, fieldName: string, setFieldValue: any) => () => {
      setFieldValue(fieldName, value)
    }

  const toggleHasVoucher = () => {
    setHasVoucher((has) => !has)
  }

  // useEffect(() => {
  //   let list = []
  //   let today = new Date()
  //   let dateCount = today.getDate()
  //
  //   list.push({
  //     label: format(today, 'dd MMMM'),
  //     value: today.toISOString(),
  //   })
  //
  //   for (let i = 1; i < 10; i++) {
  //     today.setDate(dateCount + i)
  //     list.push({
  //       label: format(today, 'dd MMMM'),
  //       value: today.toISOString(),
  //     })
  //   }
  //
  //   setDateList(list)
  // }, [])

  const [addresses, setAddresses] = useState([])

  const [totalPage, setTotalPage] = useState(0)

  const [perPage, setPerPage] = useState(6)

  const fetchAddress = async (page: number = 1) => {
    try {
      const res = await instance.get(`/addresses?page=${page}&limit=${perPage}`)
      setAddresses(res.data.items)
      setTotalPage(res.data.last_page)
    } catch (err) {
      toast.error('Error')
    }
  }

  const previewOrder = async (addressId) => {
    if (checkoutType === CheckoutType.CART) {
      const getPreviewOrderPromises = checkoutItems.map(cartItem => {
        return instance.get(`/order/preview?itemId=${cartItem.item.id}&quantity=${cartItem.quantity}&addressId=${addressId}`)
      })

      const [...result] = await Promise.all(getPreviewOrderPromises)
      console.log({ result })
    }
    if (checkoutType === CheckoutType.BUYNOW) {

    }
  }

  useEffect(() => {
    fetchAddress()

    return () => {
      dispatch({
        type: RESET_CHECKOUT,
      })
    }
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Card1 sx={{ mb: '1.5rem' }}>
            <FlexBox alignItems='center' mb={3.5}>
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  height: 32,
                  width: 32,
                  color: 'primary.text',
                  mr: '0.875rem',
                }}
              >
                1
              </Avatar>
              <Typography fontSize='20px'>Delivery Address</Typography>

            </FlexBox>


            <Dialog open={open} onClose={handleClose}>
              {/*<DialogTitle>Add new address</DialogTitle>*/}
              <DialogContent>
                <AddressEditor setAddresses={setAddresses} toggleDialog={handleClose} type={'DIALOG'} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {/*<Button onClick={handleClose}>Subscribe</Button>*/}
              </DialogActions>
            </Dialog>

            <Box mb={3.5}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                </Grid>
              </Grid>
            </Box>

            {/*<Typography mb={1.5}>Delivery Address</Typography>*/}
            <Grid container sx={{ mb: '10px' }} spacing={3}>
              {addresses.map((item, ind) => (
                <Grid item md={4} sm={6} xs={12} key={ind}>
                  <Card
                    sx={{
                      backgroundColor: 'grey.100',
                      p: '1rem',
                      boxShadow: 'none',
                      border: '1px solid',
                      cursor: 'pointer',
                      borderColor:
                        item.id === values.addressId
                          ? 'primary.main'
                          : 'transparent',
                    }}
                    onClick={() => {
                      handleFieldValueChange(
                        item.id,
                        'addressId',
                        setFieldValue,
                      )()
                      setAddressId(item.id)
                      previewOrder(item.id)
                    }}
                  >
                    <H6 mb={0.5}>{item.name}</H6>
                    <H6 mb={0.5}>{item.phoneNumber}</H6>
                    <Paragraph color='grey.700'>{item.address}</Paragraph>
                  </Card>

                </Grid>

              ))}
            </Grid>
            <Button onClick={handleClickOpen} variant='outlined' startIcon={<Add />}>
              Add new address
            </Button>
            <FlexBox justifyContent='center' mt={5}>
              <Pagination
                count={totalPage}
                onChange={(event, value) => {
                  fetchAddress(value)
                }}
              />
            </FlexBox>
          </Card1>


          <Card1 sx={{ mb: '1.5rem' }}>
            <FlexBox alignItems='center' mb={3.5}>
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.text',
                  mr: '0.875rem',
                  height: 32,
                  width: 32,
                }}
              >
                2
              </Avatar>
              <Typography fontSize='20px'>Payment</Typography>
            </FlexBox>

            {/*<Typography mb={1.5}>Saved Payment Methods</Typography>*/}
            {/*<Grid container spacing={3}>*/}
            {/*  {paymentMethodList.map((item) => (*/}
            {/*    <Grid item md={4} sm={6} xs={12} key={item.cardType}>*/}
            {/*      <Card*/}
            {/*        sx={{*/}
            {/*          backgroundColor: 'grey.100',*/}
            {/*          p: '1rem',*/}
            {/*          boxShadow: 'none',*/}
            {/*          border: '1px solid',*/}
            {/*          cursor: 'pointer',*/}
            {/*          borderColor:*/}
            {/*            item.cardType === values.paymentType*/}
            {/*              ? 'primary.main'*/}
            {/*              : 'transparent',*/}
            {/*        }}*/}
            {/*        onClick={() => {*/}
            {/*          handleFieldValueChange(*/}
            {/*            item.cardType,*/}
            {/*            'paymentType',*/}
            {/*            setFieldValue,*/}
            {/*          )()*/}
            {/*          setPaymentType(item.cardType)*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        <Box position='relative' mb={1}>*/}
            {/*          <img*/}
            {/*            src={item.url}*/}
            {/*            // layout="fill"*/}
            {/*            // objectFit="contain"*/}
            {/*            style={{ width: '100%', height: '100px' }}*/}
            {/*          />*/}
            {/*        </Box>*/}

            {/*        <Paragraph color='grey.700'>*/}
            {/*          /!***** **** **** {item.last4Digits}*!/*/}
            {/*        </Paragraph>*/}
            {/*        /!*<Paragraph color="grey.700">{item.name}</Paragraph>*!/*/}
            {/*      </Card>*/}
            {/*    </Grid>*/}
            {/*  ))}*/}
            {/*</Grid>*/}

            <Button
              sx={{
                color: 'primary.main',
                mt: '1.5rem',
                lineHeight: 1,
              }}
              onClick={toggleHasVoucher}
            >
              You have {userBalance} laz coin
            </Button>

            {hasVoucher && (
              <FlexBox mt={3} maxWidth='400px'>
                <TextField
                  name='coinDiscount'
                  placeholder='Enter desired coin discount here'
                  fullWidth
                  value={coinDiscount || 0}
                  onChange={handleCoinDiscountChange}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                {/*<Button*/}
                {/*  variant='contained'*/}
                {/*  color='primary'*/}
                {/*  type='button'*/}
                {/*  sx={{ ml: '1rem' }}*/}
                {/*>*/}
                {/*  Apply*/}
                {/*</Button>*/}
              </FlexBox>
            )}

            {/*<Button*/}
            {/*  variant='contained'*/}
            {/*  color='primary'*/}
            {/*  type='submit'*/}
            {/*  fullWidth*/}
            {/*  sx={{ mt: '1.5rem' }}*/}
            {/*  disabled={!addressId || !paymentType || !checkoutType}*/}
            {/*>*/}
            {/*  Confirm*/}
            {/*</Button>*/}
            <PayPalButton

              createOrder={
                async (data, action) => {

                  const dataSend = {
                    paymentType: paymentType,
                    checkoutType: checkoutType,
                    addressId: addressId,
                    additionalComment,
                    coinDiscount : parseInt(coinDiscount.toString())
                  }

                  if (checkoutType === CheckoutType.CART) {
                    dataSend.cartItems = cartItems
                  }
                  if (checkoutType === CheckoutType.BUYNOW) {
                    dataSend.buyNowItem = {
                      id: buyNowItem.item.id,
                      quantity: buyNowItem.quantity,
                    }
                  }


                  const res = await instance.post('/payment/paypal/setup-order', dataSend)
                  console.log(res)
                  return res.data.orderId
                }
              }
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              // onSuccess={(details, data) => {
              //   alert('Transaction completed by ' + details.payer.name.given_name)
              //
              //   // OPTIONAL: Call your server to save the transaction
              //   return fetch('/paypal-transaction-complete', {
              //     method: 'post',
              //     body: JSON.stringify({
              //       orderID: data.orderID,
              //     }),
              //   })
              // }}
              onApprove={async (data, actions) => {
                const dataSend = {
                  paymentType: paymentType,
                  checkoutType: checkoutType,
                  addressId: addressId,
                  additionalComment,
                }

                if (checkoutType === CheckoutType.CART) {
                  dataSend.cartItems = cartItems
                }
                if (checkoutType === CheckoutType.BUYNOW) {
                  dataSend.buyNowItem = {
                    id: buyNowItem.item.id,
                    quantity: buyNowItem.quantity,
                  }
                }
                await instance.post('/payment/paypal/capture-order', {
                  orderId: data.orderID,
                  data: dataSend,
                  coinDiscount : parseInt(coinDiscount.toString())
                })
                await router.push('/orders')
              }}
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                currency: 'USD',
              }}
            />
          </Card1>
        </form>
      )}
    </Formik>
  )
}


const paymentMethodList = [
  {
    cardType: PaymentType.ZALO_PAY,
    url: 'https://tophanmem.com/wp-content/uploads/2020/07/ZaloPay.png',
    // name: 'Jaslynn Land',
  },
  {
    cardType: PaymentType.CASH_ON_DELIVERY,
    url: 'https://png.pngtree.com/png-clipart/20210523/ourlarge/pngtree-cash-on-delivery-green-stamp-cod-png-image_3342456.jpg',
    // name: 'Jaslynn Land',
  },
]


const initialValues = {
  addressId: '',
  paymentType: '',
  coinDiscount : 0
}

const checkoutSchema = yup.object().shape({
  addressId: yup.string().required('required'),
  paymentType: yup.string().required('required'),
  coinDiscount : yup.number()
})

export default CheckoutForm2
