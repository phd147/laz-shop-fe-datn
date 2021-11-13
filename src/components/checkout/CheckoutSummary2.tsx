import FlexBox from '@component/FlexBox'
import { Span } from '@component/Typography'
import { Box, Divider, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import checkoutReducer from '../../redux/reducers/checkoutReducer'
import { CheckoutType } from '../../constants/cart'
import cartReducer from '../../redux/reducers/cartReducer'

const CheckoutSummary2 = () => {

  const { checkoutType } = useSelector(state => state.checkoutReducer)

  const {cartList} = useSelector(state => state.cartReducer);

  const {cartItems} = useSelector(state => state.checkoutReducer);


  const checkoutItems = cartList.filter(cartItem => cartItems.includes(cartItem.id));

  const subTotal = CheckoutType.CART ?  checkoutItems.reduce((total, cartItems ) => {
    const finalTotal = total + cartItems.quantity * cartItems.item.price ;
    return finalTotal ;
  },0) : 9999

  return (
    <Box>
      <Typography color='secondary.900' fontWeight='700' mb={3}>
        Your order
      </Typography>

      { checkoutType === CheckoutType.CART && checkoutItems.map((cartItem) => (
        <FlexBox
          justifyContent='space-between'
          alignItems='center'
          mb={3}
          key={cartItem.item.name}
        >
          <Typography>
            <Span fontWeight='700' fontSize='14px'>
              {cartItem.quantity}
            </Span>{' '}
            x {cartItem.item.name}
          </Typography>
          <Typography>${ cartItem.quantity * cartItem.item.price.toFixed(2)}</Typography>
        </FlexBox>
      ))}

      {
        checkoutType === CheckoutType.BUYNOW &&
        <FlexBox
          justifyContent='space-between'
          alignItems='center'
          mb={3}
          key={''}
        >
          <Typography>
            <Span fontWeight='700' fontSize='14px'>
              quantity
            </Span>{' '}
            name
          </Typography>
          <Typography> total price</Typography>
        </FlexBox>
      }



      <Divider sx={{ borderColor: 'grey.300', mb: '1.5rem' }} />

      <FlexBox justifyContent='space-between' alignItems='center' mb={1}>
        <Typography color='grey.600'>Subtotal:</Typography>
        <Typography fontWeight='700'>{ subTotal }</Typography>
      </FlexBox>

      <FlexBox justifyContent='space-between' alignItems='center' mb={1}>
        <Typography color='grey.600'>Shipping:</Typography>
        <Typography fontWeight='700'>-</Typography>
      </FlexBox>

      {/*<FlexBox justifyContent="space-between" alignItems="center" mb={1}>*/}
      {/*  <Typography color="grey.600">Tax:</Typography>*/}
      {/*  <Typography fontWeight="700">${(40).toFixed(2)}</Typography>*/}
      {/*</FlexBox>*/}

      <FlexBox justifyContent='space-between' alignItems='center' mb={3}>
        <Typography color='grey.600'>Discount:</Typography>
        <Typography fontWeight='700'>-</Typography>
      </FlexBox>

      <Divider sx={{ borderColor: 'grey.300', mb: '0.5rem' }} />

      <FlexBox
        fontWeight='700'
        justifyContent='space-between'
        alignItems='center'
        mb={1}
      >
        <Typography>Total:</Typography>
        <Typography fontWeight='700'>{ CheckoutType.CART ?  checkoutItems.reduce((total, cartItems ) => {
          const finalTotal = total + cartItems.quantity * cartItems.item.price ;
          return finalTotal ;
        },0) : 9999 }</Typography>
      </FlexBox>
    </Box>
  )
}

export default CheckoutSummary2
