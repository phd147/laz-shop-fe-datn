import CheckoutForm from '@component/checkout/CheckoutForm'
import CheckoutSummary from '@component/checkout/CheckoutSummary'
import CheckoutNavLayout from '@component/layout/CheckoutNavLayout'
import { Grid } from '@material-ui/core'
import React from 'react'

const Checkout = ({ userInfo } : any) => {

  return (
    <CheckoutNavLayout>
      <h1>{userInfo.name}</h1>
      <Grid container flexWrap='wrap-reverse' spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <CheckoutSummary />
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  )
}

export default Checkout
