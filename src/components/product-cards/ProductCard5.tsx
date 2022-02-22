import HoverBox from '@component/HoverBox'
import LazyImage from '@component/LazyImage'
import { H4 } from '@component/Typography'
import { Box } from '@material-ui/core'
import React from 'react'

export interface ProductCard5Props {
  imageUrl: string
  name: string
}

const ProductCard5: React.FC<ProductCard5Props> = ({ imageUrl, name }) => {
  return (
    <Box>
      <HoverBox borderRadius="5px" mb={1}>
        <LazyImage
          src={imageUrl}
          width={260}
          height={175}
          layout="responsive"
          objectFit="cover"
          alt={name}
        />
      </HoverBox>
      <H4 fontSize="14px" fontWeight="600">
        {name}
      </H4>
    </Box>
  )
}

export default ProductCard5
