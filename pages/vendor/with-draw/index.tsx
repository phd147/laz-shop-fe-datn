import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import { Money } from '@material-ui/icons'
import ShopChat from '@component/chat/shop_chat'
import { ChatType } from '../../../src/constants/chat'
import React, { useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { Button } from '@mui/material'
import { instance } from '../../../src/api/api'

const WithDraw = () => {

  const [amount, setAmount] = useState(0)
  const [email, setEmail] = useState('')

  const submitHandler = () => {
    try {
      const res = instance.post('/payment/paypal/send-money', {
        email,
        amount,
      })
      console.log(res)
    } catch (err) {

    }
  }

  return (
    <VendorDashboardLayout>
      <DashboardPageHeader title='WithDraw' icon={Money} />
      <div>
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12} >
            <TextField
              name='amount'
              label='Amount'
              placeholder='Amount'
              type='number'
              fullWidth
              onChange={e => setAmount(e.target.value)}
              value={amount}
              // error={!!touched.length && !!errors.length}
              // helperText={touched.length && errors.length}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              name='email'
              type='email'
              label='Email'
              fullWidth
              onChange={e => setEmail(e.target.value)}
              value={email}
              // error={!!touched.email && !!errors.email}
              // helperText={touched.email && errors.email}
            />
          </Grid>
        </Grid>

        <Button onClick={submitHandler}>
          WithDraw
        </Button>
      </div>
    </VendorDashboardLayout>
  )
}


export default WithDraw
