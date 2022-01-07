import FlexBox from '@component/FlexBox'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import TableRow from '@component/TableRow'
import { H5 } from '@component/Typography'
import { Pagination } from '@material-ui/core'
import ShoppingBag from '@material-ui/icons/ShoppingBag'
import React, { Fragment, useEffect, useState } from 'react'
import OrderRow from './OrderRow'
import { toast } from 'react-toastify'
import { instance } from '../../api/api'

export interface CustomerOrderListProps {
}

const CustomerOrderList: React.FC<CustomerOrderListProps> = () => {

  const [orders, setOrders] = useState([])

  const [totalPage, setTotalPage] = useState(0)

  const [perPage, setPerPage] = useState(10)

  const fetchOrders = async (page: number =1) => {
    try {
      const res = await instance.get(`/orders/user?page=${page}&limit=${perPage}`)
      setOrders(res.data.items)
      setTotalPage(res.data.last_page)

    } catch (err) {
      toast.error('Error')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <Fragment>
      <DashboardPageHeader
        title='My Orders'
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />

      <TableRow
        sx={{
          display: { xs: 'none', md: 'flex' },
          padding: '0px 18px',
          background: 'none',
        }}
        elevation={0}
      >
        <H5 color='grey.600' my='0px' mx={0.75} textAlign='left'>
          Order #
        </H5>
        <H5 color='grey.600' my='0px' mx={0.75} textAlign='left'>
          Status
        </H5>
        <H5 color='grey.600' my='0px' mx={0.75} textAlign='left'>
          Date purchased
        </H5>
        <H5 color='grey.600' my='0px' mx={0.75} textAlign='left'>
          Total
        </H5>
        <H5 flex='0 0 0 !important' color='grey.600' px={2.75} py={0.5} my={0}></H5>
      </TableRow>

      {orders.map((order, ind) => (
        <OrderRow order={order} key={ind} />
      ))}

      <FlexBox justifyContent='center' mt={5}>
        <Pagination
          count={totalPage}
          variant='outlined'
          color='primary'
          onChange={(event,value) => {
            fetchOrders(value);
          }}
        />
      </FlexBox>
    </Fragment>
  )
}


export default CustomerOrderList
