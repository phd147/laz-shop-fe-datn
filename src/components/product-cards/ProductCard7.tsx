import Image from '@component/BazarImage'
import FlexBox from '@component/FlexBox'
import { Span } from '@component/Typography'
import { Button, IconButton } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import Remove from '@material-ui/icons/Remove'
import { Box } from '@material-ui/system'
import Link from 'next/link'
import React, { useState } from 'react'
import ProductCard7Style from './ProductCard7Style'
import { CHANGE_AMOUNT_CART_ITEM_SAGA, DELETE_CART_ITEM_SAGA, TOGGLE_CART_ITEM } from '../../redux/constants'
import { ChangeAmount } from '../../constants/cart'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '@mui/material'

export interface ProductCard7Props {
  id: number
  // name: string
  quantity: number
  // price: number
  // imgUrl?: string
  item: object
}

const ProductCard7: React.FC<ProductCard7Props> = ({
                                                     id,
                                                     quantity,
                                                     item,
                                                   }) => {

  const { id: itemId, name, imageUrl, price } = item

  const dispatch = useDispatch()


  const { cartItems } = useSelector(state => state.checkoutReducer)

  const checked = cartItems.includes(id)

  const handleCartAmountChange = (type: ChangeAmount) => {
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

  const toggleCartItem = (e, id) => {
    const checked = e.target.checked
    dispatch({
      type : TOGGLE_CART_ITEM,
      checked , id
    })
  }


  return (
    <ProductCard7Style>
      <Checkbox
        checked={checked}
        onChange={(e) => toggleCartItem(e, id)}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Image
        src={imageUrl || '/assets/images/products/iphone-xi.png'}
        height={140}
        width={140}
        display='block'
        alt={name}
      />
      <FlexBox
        className='product-details'
        flexDirection='column'
        justifyContent='space-between'
        minWidth='0px'
        width='100%'
      >
        <Link href={`/product/${itemId}`}>
          <a>
            <Span className='title' fontWeight='600' fontSize='18px' mb={1}>
              {name}
            </Span>
          </a>
        </Link>
        <Box position='absolute' right='1rem' top='1rem'>
          <IconButton
            size='small'
            sx={{
              padding: '4px',
              ml: '12px',
            }}
            onClick={() => deleteCartItemHandler(id)}
          >
            <Close fontSize='small' />
          </IconButton>
        </Box>

        <FlexBox
          // width="100%"
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <FlexBox flexWrap='wrap' alignItems='center'>
            <Span color='grey.600' mr={1}>
              ${price.toFixed(2)} x {quantity}
            </Span>
            <Span fontWeight={600} color='primary.main' mr={2}>
              ${(price * quantity).toFixed(2)}
            </Span>
          </FlexBox>

          <FlexBox alignItems='center'>
            <Button
              variant='outlined'
              color='primary'
              // padding="5px"
              // size="none"
              // borderColor="primary.light"
              disabled={quantity === 1}
              sx={{ p: '5px' }}
              onClick={() => handleCartAmountChange(ChangeAmount.DECREMENT)}
            >
              <Remove fontSize='small' />
            </Button>
            <Span mx={1} fontWeight='600' fontSize='15px'>
              {quantity}
            </Span>
            <Button
              variant='outlined'
              color='primary'
              // padding="5px"
              // size="none"
              // borderColor="primary.light"
              sx={{ p: '5px' }}
              onClick={() => handleCartAmountChange(ChangeAmount.INCREMENT)}
            >
              <Add fontSize='small' />
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </ProductCard7Style>
  )
}

export default ProductCard7
