import Light from '@component/icons/Light'
import useWindowSize from '@hook/useWindowSize'
import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Carousel from '../carousel/Carousel'
import CategorySectionCreator from '../CategorySectionCreator'
import ProductCard1 from '../product-cards/ProductCard1'
import { useDispatch, useSelector } from 'react-redux'
import { INIT_GENERAL_ITEM_SAGA } from '../../redux/constants'
import { toast } from 'react-toastify'
import { instance } from '../../api/api'

const Section2 = () => {

  // const dispatch = useDispatch()
  //
  // useEffect(() => {
  //   dispatch({
  //     type: INIT_GENERAL_ITEM_SAGA,
  //   })
  // }, [])


  const { generalItem } = useSelector(state => state.itemReducer)

  const [isFetchRecommend, setIsFetchRecommend] = useState(false)
  const [recommendItems , setRecommendItems] = useState([])

  const {isLogin} = useSelector(state => state.authReducer)
  const {user} = useSelector(state => state.authReducer)

  const [visibleSlides, setVisibleSlides] = useState(4)
  const width = useWindowSize()

  useEffect(() => {
    if (width < 500) setVisibleSlides(1)
    else if (width < 650) setVisibleSlides(2)
    else if (width < 950) setVisibleSlides(3)
    else setVisibleSlides(4)
  }, [width])

  const fetchRecommendItem = async () => {
    try {
        const res = await instance.get(`/recommend?is_auth=1&user_id=${user.id}`)
      console.log(res)
      setRecommendItems(res.data)
    }catch(err){
      toast.error('Error')
    }
  }

  const fetchRecommend = async () => {
    try {
      const res = await instance.get(`/recommend?is_auth=0`)
      console.log(res)
      setRecommendItems(res.data)
    }catch(err){
      toast.error('Error')
    }
  }

  useEffect(() => {
    if(isLogin && !isFetchRecommend){
      fetchRecommendItem()
      setIsFetchRecommend(true)
    }
  })

  useEffect(() => {
    fetchRecommend()
  },[])

  return (
    <CategorySectionCreator
      icon={<Light color='primary' />}
      title='Recommend for you'
    >
      <Box mt={-0.5} mb={-0.5}>
        <Carousel
          totalSlides={generalItem.length}
          visibleSlides={visibleSlides}
          infinite={true}
        >
          {recommendItems.map((item, ind) => (
            <Box py={0.5} key={ind}>
              <ProductCard1
                shop={item.shop}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                averageStar={item.averageStar}
                price={item.price}
                off={20}
                disableAddToCart={true}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  )
}

// const productList = [
//   {
//     imgUrl: '/assets/images/products/flash-1.png',
//   },
//   {
//     imgUrl: '/assets/images/products/flash-2.png',
//   },
//   {
//     imgUrl: '/assets/images/products/flash-3.png',
//   },
//   {
//     imgUrl: '/assets/images/products/flash-4.png',
//   },
//   {
//     imgUrl: '/assets/images/products/flash-1.png',
//   },
//   {
//     imgUrl: '/assets/images/products/flash-2.png',
//   },
//   {
//     imgUrl: '/assets/images/products/flash-3.png',
//   },
//   {
//     imgUrl: '/assets/images/products/flash-4.png',
//   },
//   {
//     imgUrl: '/assets/images/products/flash-1.png',
//   },
//   {
//     imgUrl: '/assets/images/products/flash-2.png',
//   },
// ]

export default Section2
