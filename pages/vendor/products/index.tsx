import FlexBox from '@component/FlexBox'
import DeliveryBox from '@component/icons/DeliveryBox'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
import TableRow from '@component/TableRow'
import { H5 } from '@component/Typography'
import { Avatar, IconButton, Pagination, Typography } from '@material-ui/core'
import East from '@material-ui/icons/East'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { instance } from '../../../src/api/api'

import { useSelector } from 'react-redux'

const Products = () => {

  const { user } = useSelector(state => state.authReducer)

  const [productList, setProductList] = useState([])

  const [lastPage, setLastPage] = useState(1)

  const [perPage, setPerPage] = useState(10);


  const getProductList = async (currentPage: number) => {
    try {
      const res = await instance.get(`/items?shopId=${user.shop.id}&page=${currentPage}&limit=${perPage}`)
      console.log({ res })
      setProductList(res.data.items)
      setLastPage(res.data.last_page)
    } catch (err) {
      console.log({ err })
    }
  }

  useEffect(() => {
    getProductList(1)
  }, [])

  return (
    <VendorDashboardLayout>
      <DashboardPageHeader title='Products' icon={DeliveryBox} />
      {productList.length === 0 ? null : <TableRow
        sx={{
          display: { xs: 'none', md: 'flex' },
          padding: '0px 18px',
          mb: '-0.125rem',
          bgcolor: 'transparent',
        }}
        elevation={0}
      >
        <FlexBox my='0px' mx={0.75} flex='2 2 220px !important'>
          <H5 ml={7} color='grey.600' textAlign='left'>
            Name
          </H5>
        </FlexBox>
        <H5 color='grey.600' my='0px' mx={0.75} textAlign='left'>
          Amount
        </H5>
        <H5 color='grey.600' my='0px' mx={0.75} textAlign='left'>
          Price
        </H5>
        {/*<H5 color="grey.600" my="0px" mx={0.75} textAlign="left">*/}
        {/*  Sale Price*/}
        {/*</H5>*/}
        <H5 flex='0 0 0 !important' color='grey.600' px={2.75} my='0px'></H5>
      </TableRow>}

      {productList.map((item, ind) => (
        <Link href={`/vendor/products/${item.id}`} key={ind}>
          <TableRow sx={{ my: '1rem', padding: '6px 18px' }}>
            <FlexBox alignItems='center' m={0.75} flex='2 2 220px !important'>
              <Avatar
                // src='/assets/images/products/imageshoes.png'
                src={item.imageUrl}
                sx={{ height: 36, width: 36 }}
              />
              <Typography textAlign='left' ml={2.5}>
                {/*Nike React Phantom Run Flyknit 2*/}
                {item.name}
              </Typography>
            </FlexBox>
            <H5
              m={0.75}
              textAlign='left'
              fontWeight='600'
              // color={item.amount < 6 ? 'error.main' : 'inherit'}
            >
              {/*{item.stock.toString().padStart(2, '0')}*/}
              {item.amount}
            </H5>
            <H5 m={0.75} textAlign='left' fontWeight='400'>
              ${item.price.toFixed(2)}
            </H5>
            {/*<H5 m={0.75} textAlign="left" fontWeight="400">*/}
            {/*  ${item.price.toFixed(2)}*/}
            {/*</H5>*/}

            <Typography
              textAlign='center'
              color='grey.600'
              sx={{
                flex: '0 0 0 !important',
                display: { xs: 'none', md: 'block' },
              }}
            >
              <IconButton>
                <East fontSize='small' color='inherit' />
              </IconButton>
            </Typography>
          </TableRow>
        </Link>
      ))}

      {productList.length === 0 ? <h3>Products is empty</h3> : <FlexBox justifyContent='center' mt={5}>
        <Pagination
          count={lastPage}
          onChange={(event, value) => {
            getProductList(value)
          }}
        />
      </FlexBox>}
    </VendorDashboardLayout>
  )
}

// const productList = [
//   {
//     orderNo: '1050017AS',
//     stock: 30,
//     price: 350,
//     href: '/vendor/products/5452423',
//   },
//   {
//     orderNo: '1050017AS',
//     stock: 20,
//     price: 500,
//     href: '/vendor/products/5452423',
//   },
//   {
//     orderNo: '1050017AS',
//     stock: 2,
//     price: 700,
//     href: '/vendor/products/5452423',
//   },
//   {
//     orderNo: '1050017AS',
//     stock: 25,
//     price: 300,
//     href: '/vendor/products/5452423',
//   },
//   {
//     orderNo: '1050017AS',
//     stock: 1,
//     price: 700,
//     href: '/vendor/products/5452423',
//   },
// ]

export default Products
