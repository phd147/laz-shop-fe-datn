import FlexBox from '@component/FlexBox'
import NavbarLayout from '@component/layout/NavbarLayout'
import ProductCard1List from '@component/products/ProductCard1List'
import ProductCard9List from '@component/products/ProductCard9List'
import ProductFilterCard from '@component/products/ProductFilterCard'
import Sidenav from '@component/sidenav/Sidenav'
import { H5, Paragraph } from '@component/Typography'
import useWindowSize from '@hook/useWindowSize'
import { Card, Grid, IconButton, MenuItem, Pagination, TextField } from '@material-ui/core'
import Apps from '@material-ui/icons/Apps'
import FilterList from '@material-ui/icons/FilterList'
import ViewList from '@material-ui/icons/ViewList'
import { Box } from '@material-ui/system'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { instance } from '../../../src/api/api'

const ProductSearchResult = () => {
  const [view, setView] = useState('grid')
  const width = useWindowSize()
  const isTablet = width < 1024

  const toggleView = useCallback(
    (v) => () => {
      setView(v)
    },
    [],
  )

  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(16);

  const router = useRouter()

  const { type, id } = router.query
  console.log(router.query)


  const [items,setItems] = useState([]);

  const fetchItems = async (page=1) => {
    try {
        const url = type === 'category' ? `/item/search?type=category&categoryName=${id}&page=${page}&limit=${limit}` : `/item/search?search[item_name]=${id}&page=${page}&limit=${limit}`
      const res = await instance.get(url);
        setItems(res.data)
    }catch(err){
      toast.error('Error')
    }
  }

  useEffect(() => {
    fetchItems();
  },[])


  return (
    <NavbarLayout>
      <Box pt={2.5}>
        <Card
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: '55px',
            p: {
              xs: '1.25rem 1.25rem 0.25rem',
              sm: '1rem 1.25rem',
              md: '0.5rem 1.25rem',
            },
          }}
          elevation={1}
        >
          <div>
            <H5>Searching for {type === 'category' && type} “ {id}”</H5>
            <Paragraph color='grey.600'>48 results found</Paragraph>
          </div>
          <FlexBox alignItems='center' flexWrap='wrap' my='0.5rem'>

            <FlexBox alignItems='center' my='0.25rem'>
              <Paragraph color='grey.600' mr={1}>
                View:
              </Paragraph>
              <IconButton onClick={toggleView('grid')}>
                <Apps
                  color={view === 'grid' ? 'primary' : 'inherit'}
                  fontSize='small'
                />
              </IconButton>
              <IconButton onClick={toggleView('list')}>
                <ViewList
                  color={view === 'list' ? 'primary' : 'inherit'}
                  fontSize='small'
                />
              </IconButton>

              {!!isTablet && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize='small' />
                    </IconButton>
                  }
                >
                  <ProductFilterCard />
                </Sidenav>
              )}
            </FlexBox>
          </FlexBox>
        </Card>

        <Grid container spacing={3}>

          <Grid item lg={12} xs={12}>
            {view === 'grid' ? <ProductCard1List shopItems={items.items} /> : <ProductCard9List />}
            {/*<ProductCard1List shopItems={[]} />*/}
            <Pagination page={page} count={items.last_page} variant="outlined" color="primary" onChange={(e,newValue) => {
              fetchItems(newValue)
              setPage(newValue);
            }}/>
          </Grid>
        </Grid>
      </Box>
    </NavbarLayout>
  )
}

const sortOptions = [
  { label: 'Relevance', value: 'Relevance' },
  { label: 'Date', value: 'Date' },
  { label: 'Price Low to High', value: 'Price Low to High' },
  { label: 'Price High to Low', value: 'Price High to Low' },
]

export default ProductSearchResult
