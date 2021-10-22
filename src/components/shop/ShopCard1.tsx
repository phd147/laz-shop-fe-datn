import FlexBox from '@component/FlexBox'
import { H3, Span } from '@component/Typography'
import { alpha, Avatar, Card, IconButton, Rating, useTheme } from '@material-ui/core'
import Call from '@material-ui/icons/Call'
import East from '@material-ui/icons/East'
import Place from '@material-ui/icons/Place'
import { Box } from '@material-ui/system'
import Link from 'next/link'
import React from 'react'

export interface ShopCard1Props {
  name: string
  rating: number
  address: string
  phoneNumber: string
  coverUrl: string
  avatarUrl: string
  shopUrl: string
  id : number
}

const ShopCard1: React.FC<ShopCard1Props> = ({
  name,
  rating=5,
  address,
  phoneNumber,
  coverUrl,
 avatarUrl,
  shopUrl='',
  id
}) => {
  const theme = useTheme()

  return (
    <Card>
      <Box
        sx={{
          color: 'white',
          p: '17px 30px 56px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `linear-gradient(
            to bottom,
             ${alpha(theme.palette.grey[900], 0.8)},
             ${alpha(theme.palette.grey[900], 0.8)}
          ), url(${coverUrl || '/assets/images/banners/cycle.png'})`,
        }}
      >
        <H3 fontWeight="600" mb={1}>
          {name}
        </H3>

        <Rating
          value={rating || 0}
          color="warn"
          size="small"
          readOnly
          sx={{ mb: '0.75rem' }}
        />

        <FlexBox mb={1}>
          <Place fontSize="small" sx={{ fontSize: '18px', mt: '3px' }} />
          <Span color="white" ml={1.5}>
            {address}
          </Span>
        </FlexBox>

        <FlexBox>
          <Call fontSize="small" sx={{ fontSize: '18px', mt: '2px' }} />
          <Span color="white" ml={1.5}>
            {phoneNumber}
          </Span>
        </FlexBox>
      </Box>

      <FlexBox pl="30px" pr={1} justifyContent="space-between">
        <Avatar
          src={avatarUrl}
          sx={{
            height: 64,
            width: 64,
            mt: '-32px',
            border: '4px solid',
            borderColor: 'grey.100',
          }}
        />
        <Link href={`/shop/${id}`}>
          <a>
            <IconButton sx={{ my: '0.25rem' }}>
              <East />
            </IconButton>
          </a>
        </Link>
      </FlexBox>
    </Card>
  )
}

export default ShopCard1
