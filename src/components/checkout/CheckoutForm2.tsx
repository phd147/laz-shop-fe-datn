import Card1 from '@component/Card1'
import FlexBox from '@component/FlexBox'
import LazyImage from '@component/LazyImage'
import { H6, Paragraph } from '@component/Typography'
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
import { format } from 'date-fns'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { instance } from '../../api/api'
import { toast } from 'react-toastify'
import { CheckoutType } from '../../constants/cart'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_CHECKOUT } from '../../redux/constants'

type DateProps = {
  label: string
  value: string
}

enum PaymentType {
  ZALO_PAY = 'ZALO_PAY',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

const CheckoutForm2 = () => {
  const [hasVoucher, setHasVoucher] = useState(false)
  const router = useRouter()

  const dispatch = useDispatch();

  const { checkoutType, cartItems, buyNowItem } = useSelector(state => state.checkoutReducer)

  const [paymentType, setPaymentType] = useState(null)
  const [addressId, setAddressId] = useState(null)

  const handleFormSubmit = async (values: any) => {
    console.log(values)

    try {

      const data = {
        paymentType: paymentType,
        checkoutType: checkoutType,
        addressId: addressId,
      }

      if (checkoutType === CheckoutType.CART) {
        data.cartItems = cartItems
      }
      if (checkoutType === CheckoutType.BUYNOW) {
        data.buyNowItem = buyNowItem
      }


      const res = await instance.post('/payment', data);


      if (paymentType === PaymentType.CASH_ON_DELIVERY) {
           // TODO :

      } else if (paymentType === PaymentType.ZALO_PAY) {
          router.push(res.data.orderurl);
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

  useEffect(() => {
    fetchAddress()

    return () => {
      dispatch({
        type : RESET_CHECKOUT
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

            <Box mb={3.5}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  {/*  <TextField*/}
                  {/*    name="date"*/}
                  {/*    label="Delivery Date"*/}
                  {/*    error={!!touched.date && !!errors.date}*/}
                  {/*    helperText={touched.date && errors.date}*/}
                  {/*    select*/}
                  {/*    fullWidth*/}
                  {/*  >*/}
                  {/*    {dateList.map((item) => (*/}
                  {/*      <MenuItem value={item.value} key={item.label}>*/}
                  {/*        {item.label}*/}
                  {/*      </MenuItem>*/}
                  {/*    ))}*/}
                  {/*  </TextField>*/}
                  {/*</Grid>*/}
                  {/*<Grid item sm={6} xs={12}>*/}
                  {/*  <TextField*/}
                  {/*    name="date"*/}
                  {/*    label="Delivery Time"*/}
                  {/*    error={!!touched.time && !!errors.time}*/}
                  {/*    helperText={touched.time && errors.time}*/}
                  {/*    select*/}
                  {/*    fullWidth*/}
                  {/*  >*/}
                  {/*    {timeList.map((item) => (*/}
                  {/*      <MenuItem value={item.value} key={item.value}>*/}
                  {/*        {item.value}*/}
                  {/*      </MenuItem>*/}
                  {/*    ))}*/}
                  {/*  </TextField>*/}
                </Grid>
              </Grid>
            </Box>

            {/*<Typography mb={1.5}>Delivery Address</Typography>*/}
            <Grid container spacing={3}>
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
                      )();
                      setAddressId(item.id)
                    }}
                  >
                    <H6 mb={0.5}>{item.name}</H6>
                    <H6 mb={0.5}>{item.phoneNumber}</H6>
                    <Paragraph color='grey.700'>{item.address}</Paragraph>
                  </Card>
                </Grid>
              ))}
            </Grid>
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
              <Typography fontSize='20px'>Payment Type</Typography>
            </FlexBox>

            <Typography mb={1.5}>Saved Payment Methods</Typography>
            <Grid container spacing={3}>
              {paymentMethodList.map((item) => (
                <Grid item md={4} sm={6} xs={12} key={item.cardType}>
                  <Card
                    sx={{
                      backgroundColor: 'grey.100',
                      p: '1rem',
                      boxShadow: 'none',
                      border: '1px solid',
                      cursor: 'pointer',
                      borderColor:
                        item.cardType === values.paymentType
                          ? 'primary.main'
                          : 'transparent',
                    }}
                    onClick={() => {
                      handleFieldValueChange(
                        item.cardType,
                        'paymentType',
                        setFieldValue,
                      )();
                      setPaymentType(item.cardType)
                    }}
                  >
                    <Box position='relative' mb={1}>
                      <img
                        src={item.url}
                        // layout="fill"
                        // objectFit="contain"
                        style={{ width: '100%', height: '100px' }}
                      />
                    </Box>

                    <Paragraph color='grey.700'>
                      {/***** **** **** {item.last4Digits}*/}
                    </Paragraph>
                    {/*<Paragraph color="grey.700">{item.name}</Paragraph>*/}
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Button
              sx={{
                color: 'primary.main',
                mt: '1.5rem',
                lineHeight: 1,
              }}
              onClick={toggleHasVoucher}
            >
              I have a voucher
            </Button>

            {hasVoucher && (
              <FlexBox mt={3} maxWidth='400px'>
                <TextField
                  name='voucher'
                  placeholder='Enter voucher code here'
                  fullWidth
                  value={values.voucher || ''}
                  onChange={handleChange}
                />
                <Button
                  variant='contained'
                  color='primary'
                  type='button'
                  sx={{ ml: '1rem' }}
                >
                  Apply
                </Button>
              </FlexBox>
            )}

            <Button
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
              sx={{ mt: '1.5rem' }}
              disabled={ !addressId || !paymentType || !checkoutType }
            >
              Confirm
            </Button>
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
  // card: '',
  // date: '',
  // time: '',
  // voucher: '',
  paymentType: '',
}

const checkoutSchema = yup.object().shape({
  addressId: yup.string().required('required'),
  // card: yup.string().required('required'),
  // date: yup.object().required('required'),
  // time: yup.object().required('required'),
  // voucher: yup.string(),
  paymentType: yup.string().required('required'),
})

export default CheckoutForm2
