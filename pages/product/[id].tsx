import NavbarLayout from '@component/layout/NavbarLayout'
import AvailableShops from '@component/products/AvailableShops'
import FrequentlyBought from '@component/products/FrequentlyBought'
import ProductDescription from '@component/products/ProductDescription'
import ProductIntro from '@component/products/ProductIntro'
import ProductReview from '@component/products/ProductReview'
import RelatedProducts from '@component/products/RelatedProducts'
import { Box, Tab, Tabs } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { instance } from '../../src/api/api'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginTop: 80,
  marginBottom: 24,
  minHeight: 0,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  '& .inner-tab': {
    fontWeight: 600,
    minHeight: 40,
    textTransform: 'capitalize',
  },
}))

const ProductDetails = () => {

  const [totalReview, setTotalReview] = useState(0)

  const [comments, setComments] = useState([])

  const [lastPage, setLastPage] = useState(0)

  const router = useRouter()


  const { id } = router.query

  const [product, setProduct] = useState({})
  const [error, setError] = useState(null)

  const getComments = async (currentPage: number = 1) => {
    try {
      const res = await instance.get(`/items/${id}/comments?page=${currentPage}&limit=${10}`)
      setComments(res.data.items)
      setTotalReview(res.data.total)
      setLastPage(res.data.last_page)
    } catch (err) {
      toast.error('Error')
    }
  }

  const fetchProductDetail = async () => {
    try {
      const res = await instance.get(`/items/${id}`)
      setProduct(res.data)
    } catch (err) {
      toast.error('Error')
    }
  }

  useEffect(() => {
    fetchProductDetail()
    getComments()
  }, [])

  const [selectedOption, setSelectedOption] = useState(0)
  //   const classes = useStyles()

  const handleOptionClick = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedOption(newValue)
  }


  const { imageUrl, price, shop, description, name, averageStar, totalReview  :  totalReviews} = product


  return (
    <NavbarLayout>
      <ProductIntro id={id} totalReview={totalReviews}  averageStar={averageStar} imageUrl={[imageUrl]} price={price} shop={shop} name={name} />

      <StyledTabs
        value={selectedOption}
        onChange={handleOptionClick}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab className='inner-tab' label='Description' />
        <Tab className='inner-tab' label={`Review (${totalReview})`} />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 && <ProductDescription description={description} />}
        {selectedOption === 1 && <ProductReview lastPage={lastPage} itemId={id} action={{
          getComments, setComments, setTotalReview, setLastPage,fetchProductDetail
        }} comments={comments} />}
      </Box>

      {/*<FrequentlyBought />*/}

      <AvailableShops />

      <RelatedProducts />
    </NavbarLayout>
  )
}


export default ProductDetails
