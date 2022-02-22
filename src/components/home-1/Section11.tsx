import productDatabase from '@data/product-database'
import { Container, Grid, Pagination } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CategorySectionHeader from '../CategorySectionHeader'
import ProductCard1 from '../product-cards/ProductCard1'

import { useSelector, useDispatch } from 'react-redux'
import { INIT_GENERAL_ITEM_SAGA } from '../../redux/constants'
import FlexBox from '@component/FlexBox'

const Section11 = () => {

  const dispatch = useDispatch()

  const [lastPage, setLastPage] = useState(1)
  const [perPage, setPerPage] = useState(16)

  const getGeneralItem = (currentPage: number) => {
    dispatch({
      type: INIT_GENERAL_ITEM_SAGA,
      currentPage,
      setLastPage,
      perPage,
    })
  }

  useEffect(() => {
    getGeneralItem(1)
  }, [])


  const { generalItem } = useSelector(state => state.itemReducer)

  return (
    <Container sx={{ mb: '70px' }}>
      <CategorySectionHeader title='More For You'  />
      <Grid container spacing={3}>
        {generalItem.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1 off={25} hoverEffect {...item} />
          </Grid>
        ))}
      </Grid>
      <FlexBox justifyContent='center' mt={5}>
        <Pagination
          count={lastPage}
          variant='outlined'
          color='primary'
          onChange={(event, value) => {
            getGeneralItem(value)
          }}
        />
      </FlexBox>
    </Container>
  )
}

export default Section11
