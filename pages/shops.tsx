import FlexBox from '@component/FlexBox'
import NavbarLayout from '@component/layout/NavbarLayout'
import ShopCard1 from '@component/shop/ShopCard1'
import { H2, Span } from '@component/Typography'
import { Grid, Pagination } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { instance } from '../src/api/api'

const ShopList = () => {

  const [shopList, setShopList] = useState([])

  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(6);

  const getShopLists = async (page=1) => {
    try {
      const res = await instance.get(`/shops?page=${page}&limit=${limit}`)
      console.log({res})
      setShopList(res.data.items)
    }catch(err){
      console.log({err})
    }
  }

  useEffect(() => {
    getShopLists();
  },[])

  return (
    <NavbarLayout>
      <H2 mb={3}>All Shops</H2>

      <Grid container spacing={3}>
        {shopList.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            <ShopCard1 {...item} />
          </Grid>
        ))}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        {/*<Span color="grey.600">Showing 1-9 of 300 Shops</Span>*/}
        <Pagination page={page} count={shopList.last_page} variant="outlined" color="primary" onChagne={(e,newValue) => {
              getShopLists(newValue);
              setPage(newValue);
        }}/>
      </FlexBox>
    </NavbarLayout>
  )
}

export default ShopList
