import ProductCard1 from '@component/product-cards/ProductCard1'
import { H3 } from '@component/Typography'
import { Box, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { instance } from '../../api/api'

export interface RelatedProductsProps {
  productId ?: number ;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  productId
                                                         }) => {

  const [relatedProducts,setRelatedProducts] = useState([]);

  const fetchRelatedProducts = async () => {
    try {
      if(productId){
        const res = await instance.get(`/items?productId=${productId}&limit=6`)
        setRelatedProducts(res.data.items);
      }
    }catch(err){
      toast.error(err.response?.data.message);
    }
  }

  useEffect(() => {
    fetchRelatedProducts();
  },[productId])

  return (
    <Box mb={7.5}>
      <H3 mb={3}>Realted Products</H3>
      <Grid container spacing={8}>
        {relatedProducts.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1 {...item} hoverEffect />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default RelatedProducts
