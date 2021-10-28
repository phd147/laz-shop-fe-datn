import FlexBox from '@component/FlexBox'
import CustomerDashboardLayout from '@component/layout/CustomerDashboardLayout'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import ProductCard1 from '@component/product-cards/ProductCard1'
import productDatabase from '@data/product-database'
import { Button, Grid, Pagination } from '@material-ui/core'
import Favorite from '@material-ui/icons/Favorite'
import React, { useEffect, useState } from 'react'
import { instance } from '../src/api/api'
import { toast } from 'react-toastify'

const WishList = () => {

  const [wishedItems, setWishedListItems] = useState([])

  const [lastPage, setLastPage] = useState(1)

  const [perPage, setPerPage] = useState(10);


  const getWishedListItems = async (currentPage: number) => {
    try {
      const res = await instance.get(`/items/favorites?limit=${perPage}&page=${currentPage}`)
      setWishedListItems(res.data.items)
      setLastPage(res.data.last_page)
    } catch (err) {
      toast.error('Error')
    }
  }

  useEffect(() => {
    getWishedListItems(1)

  }, [])


  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        title='My Wish List'
        icon={Favorite}
        button={
          <Button color='primary' sx={{ px: '2rem', bgcolor: 'primary.light' }}>
            Add All to Cart
          </Button>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Grid container spacing={3}>
        {wishedItems.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1 {...item} />
          </Grid>
        ))}
      </Grid>

      <FlexBox justifyContent='center' mt={5}>
        <Pagination
          count={lastPage}
          variant='outlined'
          color='primary'
          onChange={(event, value) => {
            console.log(value)
            getWishedListItems(value)
          }}
        />
      </FlexBox>
    </CustomerDashboardLayout>
  )
}

export default WishList
