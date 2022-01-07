import FlexBox from '@component/FlexBox'
import TableRow from '@component/TableRow'
import { H5 } from '@component/Typography'
import { Pagination } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import OrderRow from './OrderRow'
import { instance } from '../../api/api'
import { toast } from 'react-toastify'

export interface VendorOrderListProps {}



const VendorOrderList: React.FC<VendorOrderListProps> = () => {

  const [orders, setOrders] = useState([])

  const [totalPage, setTotalPage] = useState(0)

  const [perPage, setPerPage] = useState(10)

  const fetchOrders = async (page: number =1) => {
    try {
      const res = await instance.get(`/orders/shop?page=${page}&limit=${perPage}`)
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
      <TableRow
        sx={{
          display: { xs: 'none', md: 'flex' },
          padding: '0px 18px',
          background: 'none',
        }}
        elevation={0}
      >
        <H5 color="grey.600" my="0px" mx={0.75} textAlign="left">
          Order #
        </H5>
        <H5 color="grey.600" my="0px" mx={0.75} textAlign="left">
          Status
        </H5>
        <H5 color="grey.600" my="0px" mx={0.75} textAlign="left">
          Date purchased
        </H5>
        <H5 color="grey.600" my="0px" mx={0.75} textAlign="left">
          Total
        </H5>
        <H5 flex="0 0 0 !important" color="grey.600" px={2.75} my="0px"></H5>
      </TableRow>

      {orders.map((order, ind) => (
        <OrderRow isShop={true} order={order} key={ind} />
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

const orderList = [
  {
    orderNo: '1050017AS',
    status: 'Pending',
    purchaseDate: new Date(),
    price: 350,
    href: '/vendor/orders/5452423',
  },
  {
    orderNo: '1050017AS',
    status: 'Processing',
    purchaseDate: new Date(),
    price: 500,
    href: '/vendor/orders/5452423',
  },
  {
    orderNo: '1050017AS',
    status: 'Delivered',
    purchaseDate: '2020/12/23',
    price: 700,
    href: '/vendor/orders/5452423',
  },
  {
    orderNo: '1050017AS',
    status: 'Delivered',
    purchaseDate: '2020/12/23',
    price: 700,
    href: '/vendor/orders/5452423',
  },
  {
    orderNo: '1050017AS',
    status: 'Cancelled',
    purchaseDate: '2020/12/15',
    price: 300,
    href: '/vendor/orders/5452423',
  },
]

export default VendorOrderList
