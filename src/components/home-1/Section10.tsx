import BazarCard from '@component/BazarCard'
import Category from '@component/icons/Category'
import LazyImage from '@component/LazyImage'
import productDatabase from '@data/product-database'
import { Box, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MuiThemeProps } from '@theme/theme'
import Link from 'next/link'
import React, { useEffect } from 'react'
import CategorySectionHeader from '../CategorySectionHeader'

import { useDispatch, useSelector } from 'react-redux'
import { INIT_CATEGORY_SAGA } from '../../redux/constants'

const useStyles = makeStyles(({ shadows }: MuiThemeProps) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    borderRadius: 8,
    transition: 'all 250ms ease-in-out',

    '&:hover': {
      boxShadow: shadows[3],
    },
  },
}))

const Section10 = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const { categories } = useSelector(state => state.categoryReducer)


  useEffect(() => {
    dispatch({
      type: INIT_CATEGORY_SAGA,
    })
  }, [])


  const categoryList = []

  return (
    <Container sx={{ mb: '70px' }}>
      <CategorySectionHeader
        title='Categories'
        icon={<Category color='primary' />}
        seeMoreLink='#'
      />

      <Grid container spacing={3}>
        {categories?.map((category, ind) => (
          <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
            <Link href='/'>
              <a>
                <BazarCard className={classes.card} elevation={1}>
                  <LazyImage
                    src={category.imageUrl}
                    alt='fashion'
                    height='52px'
                    width='52px'
                    objectFit='contain'
                    borderRadius='8px'
                  />
                  <Box fontWeight='600' ml={1.25}>
                    {category.name}
                  </Box>
                </BazarCard>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}


export default Section10
