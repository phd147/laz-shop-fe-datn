import Navbar from '@component/navbar/Navbar'
import { Box, Container } from '@material-ui/core'
import React, { Fragment } from 'react'
import GrocerySection2 from '@component/home-2/GrocerySection2'
import GrocerySection1 from '@component/home-2/GrocerySection1'
import Carousel from '@component/carousel/Carousel'
import CarouselCard1 from '@component/carousel-cards/CarouselCard1'
import CarouselCard2 from '@component/carousel-cards/CarouselCard2'
import CarouselCard3 from '@component/carousel-cards/CarouselCard3'

const Promotions = () => {
  return (
    <Fragment>
      <Navbar />
      <Box bgcolor='gray.100'>
        <Container sx={{ py: '2rem' }}>

          <Box mb={6} mt={3}>
            {/*<GrocerySection1 />*/}
            <Carousel
              totalSlides={3}
              visibleSlides={1}
              infinite={true}
              autoPlay={true}
              showDots={true}
              showArrow={true}
              spacing='0px'
            >
              <CarouselCard1 imageUrl={'https://icms-image.slatic.net/images/ims-web/e3e28fdb-1089-4897-9894-e261812503e4.jpg'}  content={'Test'}/>
              <CarouselCard1 imageUrl={'https://icms-image.slatic.net/images/ims-web/49f6510d-46a5-4449-87c1-78324160e69c.jpg'}  content={'Test'}/>
              <CarouselCard1 imageUrl={'https://icms-image.slatic.net/images/ims-web/3cc7e9cb-f3b0-4a13-b9ca-fb339a6a2e60.jpg'}  content={'Test'}/>
              {/*<CarouselCard1 />*/}
              {/*<CarouselCard1 />*/}
            </Carousel>
          </Box>

          {/*<Box overflow="hidden">*/}
          {/*  <GrocerySection2 />*/}
          {/*</Box>*/}
        </Container>
      </Box>
    </Fragment>
  )
}

export default Promotions
