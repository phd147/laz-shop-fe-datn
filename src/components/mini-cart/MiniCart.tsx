import BazarAvatar from '@component/BazarAvatar'
import BazarButton from '@component/BazarButton'
import BazarIconButton from '@component/BazarIconButton'
import FlexBox from '@component/FlexBox'
import ShoppingBagOutlined from '@component/icons/ShoppingBagOutlined'
import LazyImage from '@component/LazyImage'
import { H5, Tiny } from '@component/Typography'
import { Box, Divider } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import Remove from '@material-ui/icons/Remove'
import { CartItem } from '@reducer/cartReducer'
import Link from 'next/link'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_AMOUNT_CART_ITEM_SAGA, DELETE_CART_ITEM_SAGA, INIT_CHECKOUT } from '../../redux/constants'
import { ChangeAmount, CheckoutType } from '../../constants/cart'
import { router } from 'next/client'
import { useRouter } from 'next/router'

type MiniCartProps = {
  toggleSidenav?: () => void
}

const MiniCart: React.FC<MiniCartProps> = ({ toggleSidenav }) => {
  const { palette } = useTheme()

  const router = useRouter();

  const dispatch = useDispatch()
  const { cartList, totalPrice } = useSelector(state => state.cartReducer)

  const handleCartAmountChange = (type: ChangeAmount, id, itemId) => {
    dispatch({
      type: CHANGE_AMOUNT_CART_ITEM_SAGA,
      data: {
        type, itemId, cartItemId: id,
      },
    })
  }

  const deleteCartItemHandler = (cartItemId: number) => {
    dispatch({
      type: DELETE_CART_ITEM_SAGA,
      cartItemId,
    })
  }


  const checkoutHandler = () => {
    toggleSidenav();
    dispatch({
      type : INIT_CHECKOUT,
      data : {
        checkoutType : CheckoutType.CART,
        cartItems : cartList.map(cartItem => cartItem.id)
      }
    })
    router.push('/checkout');
  }


  return (
    <Box width='380px'>
      <Box
        overflow='auto'
        height={`calc(100vh - ${!!cartList.length ? '80px - 3.25rem' : '0px'})`}
      >
        <FlexBox
          alignItems='center'
          m='0px 20px'
          height='74px'
          color='secondary.main'
        >
          <ShoppingBagOutlined color='inherit' />
          <Box fontWeight={600} fontSize='16px' ml={1}>
            {cartList.length} item
          </Box>
        </FlexBox>

        <Divider />

        {!!!cartList.length && (
          <FlexBox
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            height='calc(100% - 74px)'
          >
            <LazyImage
              src='/assets/images/logos/shopping-bag.svg'
              width='90px'
              height='100%'
            />
            <Box
              component='p'
              mt={2}
              color='grey.600'
              textAlign='center'
              maxWidth='200px'
            >
              Your shopping bag is empty. Start shopping
            </Box>
          </FlexBox>
        )}
        {cartList.map((cartItem: CartItem) => (
          <FlexBox
            alignItems='center'
            py={2}
            px={2.5}
            borderBottom={`1px solid ${palette.divider}`}
            key={cartItem.id}
          >
            <FlexBox alignItems='center' flexDirection='column'>
              <BazarButton
                variant='outlined'
                color='primary'
                sx={{
                  height: '32px',
                  width: '32px',
                  borderRadius: '300px',
                }}
                onClick={() => handleCartAmountChange(ChangeAmount.INCREMENT, cartItem.id, cartItem.item.id)}
              >
                <Add fontSize='small' />
              </BazarButton>
              <Box fontWeight={600} fontSize='15px' my='3px'>
                {cartItem.quantity}
              </Box>
              <BazarButton
                variant='outlined'
                color='primary'
                sx={{
                  height: '32px',
                  width: '32px',
                  borderRadius: '300px',
                }}
                onClick={() => handleCartAmountChange(ChangeAmount.DECREMENT, cartItem.id, cartItem.item.id)}
                disabled={cartItem.quantity === 1}
              >
                <Remove fontSize='small' />
              </BazarButton>
            </FlexBox>

            <Link href={`/product/${cartItem.item.id}`}>
              <a>
                <BazarAvatar
                  src={cartItem.item.imageUrl || '/assets/images/products/iphone-x.png'}
                  mx={2}
                  alt={cartItem.item.name}
                  height={76}
                  width={76}
                />
              </a>
            </Link>

            <Box flex='1 1 0'>
              <Link href={`/product/${cartItem.item.id}`}>
                <a>
                  <H5 className='title' fontSize='14px'>
                    {cartItem.item.name}
                  </H5>
                </a>
              </Link>
              <Tiny color='grey.600'>
                ${cartItem.item.price.toFixed(2)} x {cartItem.quantity}
              </Tiny>
              <Box fontWeight={600} fontSize='14px' color='primary.main' mt={0.5}>
                ${(cartItem.quantity * cartItem.item.price).toFixed(2)}
              </Box>
            </Box>

            <BazarIconButton
              ml={2.5}
              size='small'
              onClick={() => deleteCartItemHandler(cartItem.id)}
            >
              <Close fontSize='small' />
            </BazarIconButton>
          </FlexBox>
        ))}
      </Box>

      {!!cartList.length && (
        <Box p={2.5}>

            <BazarButton
              variant='contained'
              color='primary'
              sx={{
                mb: '0.75rem',
                height: '40px',
              }}
              fullWidth
              onClick={checkoutHandler}
            >
              Checkout Now (${totalPrice.toFixed(2)})
            </BazarButton>
          <Link href='/cart'>
            <BazarButton
              color='primary'
              variant='outlined'
              sx={{ height: 40 }}
              fullWidth
              onClick={toggleSidenav}
            >
              View Cart
            </BazarButton>
          </Link>
        </Box>
      )}
    </Box>
  )
}

MiniCart.defaultProps = {
  toggleSidenav: () => {
  },
}

export default MiniCart
