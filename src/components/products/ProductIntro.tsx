import BazarAvatar from '@component/BazarAvatar'
import BazarButton from '@component/BazarButton'
import BazarRating from '@component/BazarRating'
import LazyImage from '@component/LazyImage'
import { H1, H2, H3, H6 } from '@component/Typography'
import { useAppContext } from '@context/app/AppContext'
import { Box, Grid, IconButton } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import { CartItem } from '@reducer/cartReducer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import FlexBox from '../FlexBox'
import { ChangeAmount } from '../../constants/cart'
import { useDispatch, useSelector } from 'react-redux'
import cartReducer from '../../redux/reducers/cartReducer'
import {
  CHANGE_AMOUNT_CART_ITEM_SAGA,
  CHANGE_USER_CHAT_HEADER_INFO, CHANGE_USER_CHAT_HEADER_INFO_SAGA,
  INIT_CONVERSATION_WITH_SHOP, INIT_USER_MESSAGE_LIST,
  TOGGLE_SHOW_CHAT,
} from '../../redux/constants'
import { toggleLoginPopup } from '../../redux/actions'
import chatReducer from '../../redux/reducers/chatReducer'
import { instance } from '../../api/api'
import { toast } from 'react-toastify'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'


export interface ProductIntroProps {
  imageUrl?: string[]
  name: string
  price: number
  id?: string | number
  shop?: object
  averageStar: string
  totalReview: number
}

const ProductIntro: React.FC<ProductIntroProps> = ({
                                                     imageUrl = [],
                                                     name,
                                                     price = 200,
                                                     id,
                                                     shop,
                                                     averageStar,
                                                     totalReview,
                                                   }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const [isFavorite, setIsFavorite] = useState(false)

  const { isLogin } = useSelector(state => state.authReducer)

  const toggleIsFavorite = async () => {
    try {
      const res = await instance.post(`/items/${id}/favorite`)
      setIsFavorite(res.data.favorite)
    } catch (err) {
      toast.error('Error')
    }
  }

  const router = useRouter()
  const itemId = router.query.id

  const dispatch = useDispatch()
  const { cartList } = useSelector(state => state.cartReducer)

  const { user } = useSelector(state => state.chatReducer)


  const cartItem = cartList.filter(cartItem => cartItem.item.id.toString() === itemId)[0]
  console.log({ cartItem })

  const [isFirst, setIsFirst] = useState(true)


  const handleImageClick = (ind: number) => () => {
    setSelectedImage(ind)
  }

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  // const handleCartAmountChange = useCallback(
  //   (amount) => () => {
  //     dispatch({
  //       type: 'CHANGE_CART_AMOUNT',
  //       payload: {
  //         qty: amount,
  //         name: title,
  //         price,
  //         imgUrl: imgUrl[0],
  //         id: id || routerId,
  //       },
  //     })
  //   },
  //   [],
  // )

  const chatWithShopHandler = async () => {

    dispatch({
      type: INIT_CONVERSATION_WITH_SHOP,
      shop,
    })

    dispatch({
      type: CHANGE_USER_CHAT_HEADER_INFO,
      currentHeaderInfo: {
        id: shop.id,
        name: shop.name,
        avatarUrl: shop.avatarUrl,
        type: 'SHOP',
        queryId: `SHOP_${shop.id}`,
      },
    })
    const currentMessageList = user.messageList[`SHOP_${shop.id}`]
    if (!currentMessageList) {
      try {
        const res = await instance.get(`/chat/users/messages?shopId=${shop.id}`)
        dispatch({
          type: INIT_USER_MESSAGE_LIST,
          messages: res.data,
          shopId: shop.id,
        })
      } catch (err) {
        toast.error('Error')
      }
    }


    dispatch({
      type: TOGGLE_SHOW_CHAT,
      isShow: true,
    })


  }


  const handleCartAmountChange = async (type: ChangeAmount) => {
    console.log(type)
    if (isFirst) {
      setIsFirst(false)
    }

    dispatch({
      type: CHANGE_AMOUNT_CART_ITEM_SAGA,
      data: {
        type, itemId, cartItemId: cartItem?.id,
      },
    })
  }

  const getIsFavorite = async () => {
    try {
      const res = await instance.get(`/items/${id}/isFavorite`)
      setIsFavorite(!!res.data);
    } catch (err) {
      toast.error('Error');
    }
  }

  useEffect(async() => {
    if(isLogin){
      getIsFavorite();
    }
  }, [])

  return (
    <Box width='100%'>
      <Grid container spacing={3} justifyContent='space-around'>
        <Grid item md={6} xs={12} alignItems='center'>
          <Box>
            <FlexBox justifyContent='center' mb={6}>
              <LazyImage
                src={imageUrl[selectedImage]}
                // onClick={() =>
                //   openImageViewer(imageUrl.indexOf(imageUrl[selectedImage]))
                // }
                alt={name}
                height='300px'
                width='auto'
                loading='eager'
                objectFit='contain'
              />
              {isViewerOpen && (
                <ImageViewer
                  src={imageUrl}
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                  backgroundStyle={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                  }}
                />
              )}
            </FlexBox>
            <FlexBox overflow='auto'>
              {imageUrl.map((url, ind) => (
                <Box
                  height={64}
                  width={64}
                  minWidth={64}
                  bgcolor='white'
                  borderRadius='10px'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  border='1px solid'
                  style={{ cursor: 'pointer' }}
                  ml={ind === 0 ? 'auto' : 0}
                  mr={ind === imageUrl.length - 1 ? 'auto' : '10px'}
                  borderColor={selectedImage === ind ? 'primary.main' : 'grey.400'}
                  onClick={handleImageClick(ind)}
                  key={ind}
                >
                  <BazarAvatar src={url} variant='square' height={40} />
                </Box>
              ))}
            </FlexBox>
          </Box>
        </Grid>

        <Grid item md={6} xs={12} alignItems='center'>
          <H1 mb={2}>{name}</H1>

          <FlexBox alignItems='center' mb={2}>
            <Box>Brand:</Box>
            <H6 ml={1}>Xiaomi</H6>
          </FlexBox>

          <FlexBox alignItems='center' mb={2}>
            <Box lineHeight='1'>Rated:</Box>
            <Box mx={1} lineHeight='1'>
              <BazarRating color='warn' fontSize='1.25rem' value={Math.floor(Number(averageStar))} readOnly />
            </Box>
            <H6 lineHeight='1'>({totalReview})</H6>
          </FlexBox>

          <Box mb={3}>
            <H2 color='primary.main' mb={0.5} lineHeight='1'>
              ${price.toFixed(2)}
            </H2>
            <Box color='inherit'>Stock Available</Box>
          </Box>

          {(isFirst || !cartItem) ? (
            <BazarButton
              variant='contained'
              color='primary'
              sx={{
                mb: '36px',
                px: '1.75rem',
                height: '40px',
              }}
              onClick={isLogin ? () => handleCartAmountChange(ChangeAmount.INCREMENT) : () => dispatch(toggleLoginPopup())}
            >
              Add to Cart
            </BazarButton>
          ) : (
            <FlexBox alignItems='center' mb={4.5}>
              <BazarButton
                sx={{ p: '9px' }}
                variant='outlined'
                size='small'
                color='primary'
                onClick={() => handleCartAmountChange(ChangeAmount.DECREMENT)}
                disabled={cartItem?.quantity === 1}
              >
                <Remove fontSize='small' />
              </BazarButton>
              <H3 fontWeight='600' mx={2.5}>
                {cartItem?.quantity}
                {/*{cartItem?.qty.toString().padStart(2, '0')}*/}
                {/*{'????'}*/}
              </H3>
              <BazarButton
                sx={{ p: '9px' }}
                variant='outlined'
                size='small'
                color='primary'
                onClick={() => handleCartAmountChange(ChangeAmount.INCREMENT)}
              >
                <Add fontSize='small' />
              </BazarButton>
            </FlexBox>
          )}
          <FlexBox alignItems='center' mb={1}>
          <IconButton sx={{ p: '6px' }} onClick={isLogin ? toggleIsFavorite : () => dispatch(toggleLoginPopup())}>
            {isFavorite ? (
              <Favorite color='primary' fontSize='large' />
            ) : (
              <FavoriteBorder fontSize='large' />
            )}
          </IconButton>
          </FlexBox>
          <FlexBox alignItems='center' mb={2}>
            <Box>Sold By:</Box>
            <Link href={`/shop/${shop?.id}`}>
              <a>
                <H6 ml={1}>{shop?.name}</H6>
              </a>
            </Link>
          </FlexBox>
          <FlexBox alignItems='center' mb={2}>
            <BazarButton
              variant='contained'
              sx={{
                mb: '36px',
                px: '1.75rem',
                height: '40px',
              }}
              onClick={isLogin ? chatWithShopHandler : () => dispatch(toggleLoginPopup())}
            >
              Chat with shop
            </BazarButton>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  )
}

ProductIntro.defaultProps = {
  imgUrl: [
    '/assets/images/products/headphone.png',
    '/assets/images/products/hiclipart.com (16).png',
    '/assets/images/products/hiclipart.com (18).png',
  ],
  title: 'Mi Note 11 Pro',
  price: 1100,
}

export default ProductIntro
