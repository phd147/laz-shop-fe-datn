import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import { Money } from '@material-ui/icons'
import ShopChat from '@component/chat/shop_chat'
import { ChatType } from '../../../src/constants/chat'
import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { instance } from '../../../src/api/api'

import {format} from 'date-fns'

const WithDraw = () => {


  const [amount, setAmount] = useState(0)
  const [email, setEmail] = useState('')

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

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

  const handleChange = (e, newValue) => {
    setPage(newValue);
    fetchTransactions(newValue);
  }

  const fetchTransactions = async (page=1) => {
    try {
      const res = await instance.get(`/shop/transactions?sort=-createdAt&page=${page}&limit=${limit}`)
      setTransactions(res.data)
    }catch(err){

    }
  }

  useEffect(() => {
    fetchTransactions();
  },[])

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
        <h3>Transactions History</h3>
        <Grid container>
          <Grid item md={8} xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Created at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.items?.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {transaction.id}
                      </TableCell>
                      <TableCell align="right">{transaction.amount}</TableCell>
                      <TableCell align="right">{transaction.status}</TableCell>
                      <TableCell align="right">{format(new Date(transaction.createdAt), 'dd/MM/yyyy')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination count={transactions.last_page} page={page} onChange={handleChange} />
          </Grid>
        </Grid>
      </div>
    </VendorDashboardLayout>
  )
}


export default WithDraw
