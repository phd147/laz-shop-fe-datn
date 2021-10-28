import BazarAvatar from '@component/BazarAvatar'
import BazarRating from '@component/BazarRating'
import FlexBox from '@component/FlexBox'
import { H5, H6, Paragraph, Span } from '@component/Typography'
import { Box } from '@material-ui/core'
import { getDateDifference } from '@utils/utils'
import React from 'react'

export interface ProductCommentProps {
  name: string
  picture: string
  star: number
  createdAt: string
  content: string
}

const ProductComment: React.FC<ProductCommentProps> = ({
  name,
  picture,
  star,
  createdAt,
  content,
}) => {
  return (
    <Box mb={4} maxWidth="600px">
      <FlexBox alignItems="center" mb={2}>
        <BazarAvatar src={picture} height={48} width={48} />
        <Box ml={2}>
          <H5 mb={0.5}>{name}</H5>
          <FlexBox alignItems="center">
            <BazarRating value={star} color="warn" readOnly />
            <H6 mx={1.25}>{star}</H6>
            <Span>{getDateDifference(createdAt)}</Span>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color="grey.700">{content}</Paragraph>
    </Box>
  )
}

export default ProductComment
