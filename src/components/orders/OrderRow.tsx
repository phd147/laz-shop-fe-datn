import TableRow from '@component/TableRow'
import { H5 } from '@component/Typography'
import { Chip, IconButton, Typography } from '@material-ui/core'
import East from '@material-ui/icons/East'
import { Box } from '@material-ui/system'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

export interface OrderRowProps {
  order: {
    orderNo: any
    status: string
    href: string
    purchaseDate: string | Date
    price: number
  },
  isShop?: boolean
}

const OrderRow: React.FC<OrderRowProps> = ({ order, isShop }) => {
  const getColor = (status: string) => {
    switch (status) {
      // case 'PaymentProcessing':
      //   return 'secondary'
      case 'Picking':
        return 'secondary.500'
      case 'Delivering':
        return 'warning.main'
      case 'Complete':
        return 'success.500'
      case 'Cancel':
        return 'error.main'
      default:
        return ''
    }
  }

  return (
    <Link href={isShop ? `/vendor/orders/${order.code}` : `/orders/${order.code}`}>
      <a>
        <TableRow sx={{ my: '1rem', padding: '6px 18px' }}>
          <H5 m={0.75} textAlign='left'>
            {order.code.substring(0, 12).toUpperCase()}
          </H5>
          <Box m={0.75}>
            <Chip
              size='small'
              label={order.status}
              sx={{
                p: '0.25rem 0.5rem',
                fontSize: 12,
                // color: !!getColor(order.status)
                //   ? `${getColor(order.status)}.900`
                //   : 'inherit',
                backgroundColor: !!getColor(order.status)
                  ? `${getColor(order.status)}`
                  : 'none',
                // backgroundColor: 'success.900',
                color: 'warning.contrastText',
              }}
            />
          </Box>
          <Typography className='pre' m={0.75} textAlign='left'>
            {format(new Date(order.createdAt), 'MMM dd, yyyy')}
          </Typography>
          <Typography m={0.75} textAlign='left'>
            ${order.total.toFixed(2)}
          </Typography>

          <Typography
            textAlign='center'
            color='grey.600'
            sx={{
              flex: '0 0 0 !important',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <IconButton>
              <East fontSize='small' color='inherit' />
            </IconButton>
          </Typography>
        </TableRow>
      </a>
    </Link>
  )
}

export default OrderRow
