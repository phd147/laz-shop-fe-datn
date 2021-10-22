import Navbar from '@component/navbar/Navbar'
import { Box, Container } from '@material-ui/core'
import React, { Fragment } from 'react'
// import GrocerySection2 from '@component/home-2/GrocerySection2'
// import GrocerySection1 from '@component/home-2/GrocerySection1'
import Carousel from '@component/carousel/Carousel'
import CarouselCard1 from '@component/carousel-cards/CarouselCard1';

const Promotions = () => {
  return (
    <Fragment>
      <Navbar />
      <Box bgcolor='gray.100'>
        <Container sx={{ py: '2rem' }}>
          {/*<Carousel*/}
          {/*  totalSlides={2}*/}
          {/*  visibleSlides={1}*/}
          {/*  infinite={true}*/}
          {/*  autoPlay={false}*/}
          {/*  showDots={true}*/}
          {/*  showArrow={false}*/}
          {/*  spacing="0px"*/}
          {/*>*/}
          {/*  <CarouselCard1 />*/}
          {/*  <CarouselCard1 />*/}
          {/* <CarouselCard1 /> */}
          {/* <CarouselCard1 /> */}
          {/* <CarouselCard1 /> */}
          {/*</Carousel>*/}
          {/*<Box mb={6} mt={3}>*/}
            {/*<GrocerySection1 />*/}
            <Carousel totalSlides={1}>
              <CarouselCard1/>
            </Carousel>
          {/*</Box>*/}

          {/*<Box overflow="hidden">*/}
          {/*  <GrocerySection2 />*/}
          {/*</Box>*/}
        </Container>
      </Box>
    </Fragment>
  )
}

export default Promotions
