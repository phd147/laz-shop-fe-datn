import CheckoutForm from '@component/checkout/CheckoutForm'
import CheckoutSummary from '@component/checkout/CheckoutSummary'
import CheckoutNavLayout from '@component/layout/CheckoutNavLayout'
import { Avatar, Card, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { H6, Paragraph } from '@component/Typography'
import { instance } from '../src/api/api'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useRouter } from 'next/router'

import { Formik } from 'formik'
import FlexBox from '@component/FlexBox'

import Card1 from '@component/Card1'

const Checkout = () => {

  const router = useRouter();

  const user = useSelector(state => state.authReducer)

  const [addresses, setAddresses] = useState([])

  const [perPage, setPerPage] = useState(10);

  const handleFormSubmit = async (values: any) => {
    console.log(values)
    router.push('/payment')
  }

  const handleFieldValueChange =
    (value: string, fieldName: string, setFieldValue: any) => () => {
      setFieldValue(fieldName, value)
    }

  const fetchAddress =  async (page  : number = 1) => {
    try {
      const res = await instance.get(`/addresses?page=${page}&limit=${perPage}`);
      setAddresses(res.data.items);
    }catch(err){
      toast.error('Error');
    }
  }


  useEffect(() => {
    fetchAddress();
  },[])


  return (
    <CheckoutNavLayout>
      <Grid container flexWrap='wrap-reverse' spacing={3}>
        {/*<Grid item lg={8} md={8} xs={12}>*/}
        {/*  <CheckoutForm />*/}
        {/*</Grid>*/}
        {/*<Grid item lg={4} md={4} xs={12}>*/}
        {/*  <CheckoutSummary />*/}
        {/*</Grid>*/}

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Card1 sx={{ mb: '1.5rem' }}>
                <Typography mb={1.5}>Delivery Address</Typography>
                <FlexBox alignItems="center" mb={3.5}>
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
                  <Typography fontSize="20px">Delivery Details</Typography>
                </FlexBox>
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
                    item.address === values.address
                      ? 'primary.main'
                      : 'transparent',
                }}
                onClick={handleFieldValueChange(
                  item.address,
                  'address',
                  setFieldValue
                )}
              >
                <H6 mb={0.5}>{item.name}</H6>
                <Paragraph color="grey.700">{item.address}</Paragraph>
                <H6 mb={0.5}>{item.phoneNumber}</H6>
              </Card>
            </Grid>
          ))}
        </Grid>
              </Card1>
            </form>
          )}
        </Formik>
      </Grid>
    </CheckoutNavLayout>
  )
}

const initialValues = {
  addressId: '',
}

const checkoutSchema = yup.object().shape({
  addressId: yup.number().required('required'),
})

export default Checkout
