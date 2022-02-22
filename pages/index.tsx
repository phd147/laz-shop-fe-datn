import Promotions from '@component/home-1/Promotions'
 import Categories from '@component/home-1/Section10'
 import MoreForYou from '@component/home-1/Section11'
 import Section12 from '@component/home-1/Section12'
 import Section13 from '@component/home-1/Section13'
 import RecommendForYou from '@component/home-1/Section2'
// import Categories from '@component/home-1/Categories'
 import Section4 from '@component/home-1/Section4'
 import Section5 from '@component/home-1/Section5'
 import Section6 from '@component/home-1/Section6'
 import Section7 from '@component/home-1/Section7'
 import Section8 from '@component/home-1/Section8'
 import Section9 from '@component/home-1/Section9'
import AppLayout from '@component/layout/AppLayout'
import React from 'react'
 import ProductsPromotion from '@component/home-1/ProductsPromotion'
import AllProducts from '@component/home-1/AllProducts'
 import ProductsSale from '@component/home-1/ProductsSale'


const IndexPage = ({userInfo} : any) => {

  return (
    <AppLayout userInfo={userInfo}>
      <Promotions />
      <RecommendForYou />
      {/*<Categories />*/}
      {/*<ProductsPromotion />*/}
      <Categories />
      {/*<ProductsSale />*/}
      {/*<AllProducts />*/}
        <Section4 />
        {/*<Section5 />*/}
        {/*<Section13 />*/}
        {/*<Section6 />*/}
        {/*<Section7 />*/}
        {/*<Section8 />*/}
        {/*<Section9 />*/}
      <MoreForYou />
      <Section12 />
    </AppLayout>
  )
}

export default IndexPage
