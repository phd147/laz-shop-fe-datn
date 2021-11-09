import BazarButton from '@component/BazarButton'
import Image from '@component/BazarImage'
import CategoryMenu from '@component/categories/CategoryMenu'
import FlexBox from '@component/FlexBox'
import Category from '@component/icons/Category'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import MiniCart from '@component/mini-cart/MiniCart'
import Login from '@component/sessions/Login'
import { Avatar, Badge, Box, Container, Dialog, Drawer, IconButton, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import PersonOutline from '@material-ui/icons/PersonOutline'
import { makeStyles } from '@material-ui/styles'
import { MuiThemeProps } from '@theme/theme'
import { layoutConstant } from '@utils/constants'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'
import SearchBox from '../search-box/SearchBox'

import { useDispatch, useSelector } from 'react-redux'
import { toggleLoginPopup } from '../../redux/actions'

type HeaderProps = {
  className?: string
  isFixed?: boolean
}

const useStyles = makeStyles(({ palette, ...theme }: MuiThemeProps) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    height: layoutConstant.headerHeight,
    background: palette.background.paper,
    transition: 'height 250ms ease-in-out',

    [theme.breakpoints.down('sm')]: {
      height: layoutConstant.mobileHeaderHeight,
    },
  },
}))

// TODO : handle login logic, if login , then show avatar of user,

const Header: React.FC<HeaderProps> = ({ isFixed, className }) => {
  const [sidenavOpen, setSidenavOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const { isPopUpLogin } = useSelector(state => state.layoutReducer)

  const dispatch = useDispatch()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen)
  const toggleDialog = () => setDialogOpen(!dialogOpen)

  // @ts-ignore
  const { user } = useSelector(state => state.authReducer)
  const { cartList } = useSelector(state => state.cartReducer)

  const totalItems = cartList.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const classes = useStyles()

  const cartHandle = (
    <Badge badgeContent={totalItems} color='primary'>
      <Box
        component={IconButton}
        ml={2.5}
        bgcolor='grey.200'
        p={1.25}
        onClick={toggleSidenav}
      >
        <ShoppingCartIcon />
      </Box>
    </Badge>
  )

  return (
    <div className={clsx(classes.root, className)}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <FlexBox
          alignItems='center'
          mr={2}
          minWidth='170px'
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <Link href='/'>
            <a>
              <Image height={'70px'} mb={0.5} src={'https://cdn.logo.com/hotlink-ok/logo-social.png'} alt='logo' />
            </a>
          </Link>

          {isFixed && (
            <CategoryMenu>
              <FlexBox color='grey.600' alignItems='center' ml={2}>
                <BazarButton color='inherit'>
                  <Category fontSize='small' color='inherit' />
                  <KeyboardArrowDown fontSize='small' color='inherit' />
                </BazarButton>
              </FlexBox>
            </CategoryMenu>
          )}
        </FlexBox>

        <FlexBox justifyContent='center' flex='1 1 0'>
          <SearchBox />
        </FlexBox>

        <FlexBox alignItems='center' sx={{ display: { xs: 'none', md: 'flex' } }}>
          {
            !Object.keys(user).length ? <Box
              component={IconButton}
              ml={2}
              p={1.25}
              bgcolor='grey.200'
              onClick={() => dispatch(toggleLoginPopup())}
            >
              <PersonOutline />
            </Box> : <Avatar src={user?.info?.picture} />
          }

          {cartHandle}
        </FlexBox>

        <Dialog
          open={isPopUpLogin}
          fullWidth={isMobile}
          scroll='body'
          onClose={() => dispatch(toggleLoginPopup())}
        >
          <Login toggleDialog={() => dispatch(toggleLoginPopup())} />
        </Dialog>

        <Drawer open={sidenavOpen} anchor='right' onClose={toggleSidenav}>
          <MiniCart />
        </Drawer>
      </Container>
    </div>
  )
}

export default Header
