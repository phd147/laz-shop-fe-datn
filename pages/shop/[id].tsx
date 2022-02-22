import NavbarLayout from '@component/layout/NavbarLayout'
import ProductCardList from '@component/products/ProductCard1List'
import ProductFilterCard from '@component/products/ProductFilterCard'
import ShopIntroCard from '@component/shop/ShopIntroCard'
import Sidenav from '@component/sidenav/Sidenav'
import useWindowSize from '@hook/useWindowSize'
import { Grid, IconButton, Pagination } from '@material-ui/core'
import FilterList from '@material-ui/icons/FilterList'
import React, { useEffect, useState } from 'react'
import { instance } from '../../src/api/api'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import FlexBox from '@component/FlexBox'

const Shop = () => {
  const width = useWindowSize()
  const isTablet = width < 1025

  const router = useRouter()
  const { id } = router.query

  const [shop, setShop] = useState({})
  const [shopItems, setShopItems] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [lastPage, setLastPage] = useState(1)


  const getShopDetail = async () => {
    try {
      const res = await instance.get(`/shops/${id}`)
      console.log({ res })
      setShop(res.data)
    } catch (err) {
      console.log({ err })
    }
  }

  const getshopItems = async (currentPage: number) => {
    try {
      const res = await instance.get(`/items?shopId=${id}&page=${currentPage}&limit=${perPage}`)
      setLastPage(res.data.last_page)
      setShopItems(res.data.items)
    } catch (err) {
      toast.error('Error')
    }
  }

  useEffect(() => {
    getShopDetail()
    getshopItems(1)
  }, [])

  return (
    <NavbarLayout>
      <ShopIntroCard shop={shop} />
      <Grid container spacing={3}>
        {/*<Grid*/}
        {/*  item*/}
        {/*  md={3}*/}
        {/*  xs={12}*/}
        {/*  sx={{*/}
        {/*    '@media only screen and (max-width: 1024px)': {*/}
        {/*      display: 'none',*/}
        {/*    },*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <ProductFilterCard />*/}
        {/*</Grid>*/}

        <Grid item md={9} xs={12}>
          {isTablet && (
            <Sidenav
              position='left'
              handle={
                <IconButton
                  sx={{
                    marginLeft: 'auto',
                    display: 'block',
                  }}
                >
                  <FilterList fontSize='small' />
                </IconButton>
              }
            >
              <ProductFilterCard />
            </Sidenav>
          )}
          <ProductCardList shopItems={shopItems} />
          <FlexBox justifyContent='center' mt={5}>
            <Pagination
              count={lastPage}
              variant='outlined'
              color='primary'
              onChange={(event, value) => {
                console.log(value)
                getshopItems(value)
              }}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </NavbarLayout>
  )
}

export default Shop
