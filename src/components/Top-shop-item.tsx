import BazarRating from '@component/BazarRating'
import HoverBox from '@component/HoverBox'
import LazyImage from '@component/LazyImage'
import { H4, Small } from '@component/Typography'
import { Box } from '@material-ui/core'
import React, { CSSProperties } from 'react'
import FlexBox from 'FlexBox'

export interface ProductCard4Props {
  className?: string
  style?: CSSProperties
  imgUrl: string
  rating: number
  title: string
  price: number
  reviewCount: number
}

const ProductCard4: React.FC<ProductCard4Props> = ({
                                                     avatarUrl,
                                                     name,
                                                     totalProfit = 0,
                                                   }) => {
  return (
    <Box>
      <HoverBox mb={2} mx='auto' borderRadius='8px' style={{
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
      }}>
        <LazyImage
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: 'auto',
          }}
          src={avatarUrl}
          width='100%'
          height='auto'
          layout='responsive'
          alt={name}
          mx='auto'
        />
      </HoverBox>

      {/*<FlexBox justifyContent='center' alignItems='center' mb={0.5}>*/}
      {/*  /!*<BazarRating value={rating} color="warn" readOnly />*!/*/}
      {/*  /!*<Small fontWeight="600" pl={0.5}>*!/*/}
      {/*  /!*  ({reviewCount})*!/*/}
      {/*  /!*</Small>*!/*/}
      {/*</FlexBox>*/}
      <h4>{name}</h4>
      {/*<H4*/}
      {/*  fontWeight='600'*/}
      {/*  fontSize='14px'*/}
      {/*  textAlign='center'*/}
      {/*  mb={0.5}*/}
      {/*  title={name}*/}
      {/*  ellipsis*/}
      {/*>*/}
      {/*  Sold {totalProfit}$*/}
      {/*</H4>*/}
      {/*<H4 fontWeight="600" fontSize="14px" textAlign="center" color="primary.main">*/}
      {/*  ${Math.ceil(price).toLocaleString()}*/}
      {/*</H4>*/}
    </Box>
  )
}

export default ProductCard4
