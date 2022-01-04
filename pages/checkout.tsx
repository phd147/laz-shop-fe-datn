import CheckoutForm from '@component/checkout/CheckoutForm'
import CheckoutSummary from '@component/checkout/CheckoutSummary'
import CheckoutNavLayout from '@component/layout/CheckoutNavLayout'
import { Avatar, Card, Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { instance } from '../src/api/api'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useRouter } from 'next/router'

import CheckoutForm2 from '@component/checkout/CheckoutForm2'
import CheckoutSummary2 from '@component/checkout/CheckoutSummary2'

const Checkout = () => {

  const router = useRouter();


  const [additionalComment, setAdditionalComment] = useState('');


  const user = useSelector(state => state.authReducer)

  const {checkoutType} = useSelector(state => state.checkoutReducer);

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
      <Container sx={{ my: '1.5rem' }}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            <CheckoutForm2 additionalComment={additionalComment} />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <CheckoutSummary2 setAdditionalComment={setAdditionalComment} />
          </Grid>
        </Grid>
      </Container>
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
