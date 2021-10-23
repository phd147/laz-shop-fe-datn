import productDatabase from '@data/product-database'
import { Container, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import CategorySectionHeader from '../CategorySectionHeader'
import ProductCard1 from '../product-cards/ProductCard1'

import { useSelector, useDispatch } from 'react-redux'
import { INIT_GENERAL_ITEM_SAGA } from '../../redux/constants'

const Section11 = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: INIT_GENERAL_ITEM_SAGA,
    })
  }, [])


  const { generalItem } = useSelector(state => state.itemReducer)
  console.log({ generalItem })


  return (
    <Container sx={{ mb: '70px' }}>
      <CategorySectionHeader title='More For You' seeMoreLink='#' />
      <Grid container spacing={3}>
        {generalItem.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1 off={25} hoverEffect {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Section11
