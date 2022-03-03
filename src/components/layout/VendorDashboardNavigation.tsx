import FlexBox from '@component/FlexBox'
import Assignment from '@material-ui/icons/Assignment'
import Dashboard from '@material-ui/icons/Dashboard'
import NoteAdd from '@material-ui/icons/NoteAdd'
import Settings from '@material-ui/icons/Settings'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import { Message, Money } from '@material-ui/icons'
import { useRouter } from 'next/router'
import React from 'react'
import { DashboardNavigationWrapper, StyledDashboardNav } from './DashboardStyle'
import { useSelector } from 'react-redux'

const VendorDashboardNavigation = () => {
  const { pathname } = useRouter()


  return (
    <DashboardNavigationWrapper sx={{ px: '0px', py: '1.5rem', color: 'grey.900' }}>
      {linkList.map((item) => (
        <StyledDashboardNav
          isCurrentPath={pathname.includes(item.href)}
          href={item.href}
          key={item.title}
        >
          <FlexBox alignItems='center'>
            <item.icon
              className='nav-icon'
              fontSize='small'
              color='inherit'
              sx={{ mr: '10px' }}
            />

            <span>{item.title}</span>
          </FlexBox>
          <span>{item.count}</span>
        </StyledDashboardNav>
      ))}
    </DashboardNavigationWrapper>
  )
}

const linkList = [
  {
    href: '/vendor/dashboard',
    title: 'Index',
    icon: Dashboard,
  },
  {
    href: '/vendor/products',
    title: 'Products',
    icon: Assignment,
    // count: 300,
  },
  {
    href: '/vendor/add-product',
    title: 'Add product',
    icon: NoteAdd,
  },
  {
    href: '/vendor/orders',
    title: 'Orders',
    icon: ShoppingCart,
    // count: 40,
  },
  {
    href: '/vendor/account-settings',
    title: 'Shop Settings',
    icon: Settings,
  },
  {
    href: '/vendor/chat',
    title: 'Chat',
    icon: Message,
  },
  {
    href: '/vendor/with-draw',
    title: 'Withdraw',
    icon: Money,
  },
]

export default VendorDashboardNavigation
