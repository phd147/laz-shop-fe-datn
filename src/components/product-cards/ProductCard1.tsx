import BazarCard from '@component/BazarCard'
import BazarRating from '@component/BazarRating'
import LazyImage from '@component/LazyImage'
import { H3 } from '@component/Typography'
import { useAppContext } from '@context/app/AppContext'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Remove from '@material-ui/icons/Remove'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import { CSSProperties, makeStyles } from '@material-ui/styles'
import { CartItem } from '@reducer/cartReducer'
import { MuiThemeProps } from '@theme/theme'
import Link from 'next/link'
import React, { Fragment, useCallback, useState } from 'react'
import FlexBox from '../FlexBox'
import ProductIntro from '../products/ProductIntro'
import { toast } from 'react-toastify'
import { instance } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLoginPopup } from '../../redux/actions'

export interface ProductCard1Props {
  className?: string
  style?: CSSProperties
  averageStar?: string
  hoverEffect?: boolean
  // imgUrl: string
  imageUrl: string;
  // title: string
  name: string;
  price: number
  off?: number
  id: string | number
  shop?: object,
  disableAddToCart?: boolean
}

const useStyles = makeStyles(({ palette, ...theme }: MuiThemeProps) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    margin: 'auto',
    overflow: 'hidden',
    transition: 'all 250ms ease-in-out',
    borderRadius: '8px',

    '&:hover': {
      '& $imageHolder': {
        '& .extra-icons': {
          display: 'flex',
        },
      },
    },

    '@media only screen and (max-width: 768px)': {
      '& $imageHolder': {
        '& .extra-icons': {
          display: 'flex',
        },
      },
    },
  },
  imageHolder: {
    position: 'relative',
    display: 'inlin-block',
    textAlign: 'center',

    '& .extra-icons': {
      display: 'none',
      flexDirection: 'column',
      position: 'absolute',
      top: '7px',
      right: '15px',
      cursor: 'pointer',
      zIndex: 2,
    },

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  offerChip: {
    position: 'absolute',
    fontSize: '10px',
    fontWeight: 600,
    paddingLeft: 3,
    paddingRight: 3,
    top: '10px',
    left: '10px',
  },
  details: {
    padding: '1rem',

    '& .title, & .categories': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    '& .icon-holder': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },

    '& .favorite-icon': {
      cursor: 'pointer',
    },
  },
  dialogContent: {
    paddingBottom: '1.25rem',
  },
}))

const ProductCard1: React.FC<ProductCard1Props> = ({
                                                     id,
                                                     imageUrl,
                                                     name,
                                                     price,
                                                     off = 0,
                                                     averageStar = 0,
                                                     hoverEffect,
                                                     shop,
                                                     totalReview
                                                   }) => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false)

  const {isLogin} = useSelector(state => state.authReducer);

  const classes = useStyles({ hoverEffect })

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  return (
    <BazarCard className={classes.root} hoverEffect={hoverEffect}>
      <div style={{width : '100%', paddingTop : '100%', position: 'relative'}} className={classes.imageHolder} >
        {/*{!!off && (*/}
        {/*  <Chip*/}
        {/*    className={classes.offerChip}*/}
        {/*    color='primary'*/}
        {/*    size='small'*/}
        {/*    label={`${off}% off`}*/}
        {/*  />*/}
        {/*)}*/}

        <div className='extra-icons'>
          {/*<IconButton sx={{ p: '6px' }} onClick={toggleDialog}>*/}
          {/*  <RemoveRedEye color='secondary' fontSize='small' />*/}
          {/*</IconButton>*/}
          {/*<IconButton sx={{ p: '6px' }} onClick={isLogin ? toggleIsFavorite : () => dispatch(toggleLoginPopup())}>*/}
          {/*  {isFavorite ? (*/}
          {/*    <Favorite color='primary' fontSize='small' />*/}
          {/*  ) : (*/}
          {/*    <FavoriteBorder fontSize='small' />*/}
          {/*  )}*/}
          {/*</IconButton>*/}
        </div>

        <Link href={`/product/${id}`}>
          <a>
            <LazyImage
              src={imageUrl}
              width='100%'
              height='auto'
              layout='responsive'
              alt={name}
              style={{width : '100%', height : '100%', top : '0', left : '0', position : 'absolute'}}
              // style={{backgroundSize : 'cover'}}
            />
          </a>
        </Link>
      </div>

      <div className={classes.details}>
        <FlexBox>
          <Box flex='1 1 0' minWidth='0px' mr={1}>
            <Link href={`/product/${id}`}>
              <a>
                <H3
                  className='title'
                  fontSize='14px'
                  textAlign='left'
                  fontWeight='600'
                  color='text.secondary'
                  mb={1}
                  title={name}
                >
                  {name}
                </H3>
              </a>
            </Link>
            <FlexBox >
              <BazarRating value={Math.floor(Number(averageStar)) || 0} color='warn' readOnly />
             ( {totalReview} )
            </FlexBox>

            <FlexBox alignItems='center' mt={0.5}>
              {/*<Box pr={1} fontWeight='600' color='primary.main'>*/}
              {/*  ${(price - (price * off) / 100).toFixed(2)}*/}
              {/*</Box>*/}
              {
                <Box pr={1} fontWeight='600' color='primary.main'>
                  {price?.toFixed(2)} $
                </Box>
              }
            </FlexBox>
          </Box>

          {/*<FlexBox*/}
          {/*  className='add-cart'*/}
          {/*  flexDirection='column-reverse'*/}
          {/*  alignItems='center'*/}
          {/*  justifyContent={!!cartItem?.qty ? 'space-between' : 'flex-start'}*/}
          {/*  width='30px'*/}
          {/*>*/}
          {/*  <Button*/}
          {/*    variant='outlined'*/}
          {/*    color='primary'*/}
          {/*    sx={{ padding: '3px' }}*/}
          {/*    onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}*/}
          {/*  >*/}
          {/*    <Add fontSize='small' />*/}
          {/*  </Button>*/}

          {/*  {!!cartItem?.qty && (*/}
          {/*    <Fragment>*/}
          {/*      <Box color='text.primary' fontWeight='600'>*/}
          {/*        {cartItem?.qty}*/}
          {/*      </Box>*/}
          {/*      <Button*/}
          {/*        variant='outlined'*/}
          {/*        color='primary'*/}
          {/*        sx={{ padding: '3px' }}*/}
          {/*        onClick={handleCartAmountChange(cartItem?.qty - 1)}*/}
          {/*      >*/}
          {/*        <Remove fontSize='small' />*/}
          {/*      </Button>*/}
          {/*    </Fragment>*/}
          {/*  )}*/}
          {/*</FlexBox>*/}
        </FlexBox>
      </div>

      <Dialog open={open} maxWidth={false} onClose={toggleDialog}>
        <DialogContent className={classes.dialogContent}>
          <ProductIntro disableAddToCart shop={shop} id={id} imageUrl={[imageUrl]} name={name} price={price} />
          <IconButton
            sx={{ position: 'absolute', top: '0', right: '0' }}
            onClick={toggleDialog}
          >
            <Close className='close' fontSize='small' color='primary' />
          </IconButton>
        </DialogContent>
      </Dialog>
    </BazarCard>
  )
}

ProductCard1.defaultProps = {
  id: '324321',
  title: 'ASUS ROG Strix G15',
  imgUrl: '/assets/images/products/macbook.png',
  price: 450,
  rating: 0,
  off: 20,
}

export default ProductCard1
