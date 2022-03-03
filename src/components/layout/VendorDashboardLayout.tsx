import { Container, Grid } from '@material-ui/core'
import React from 'react'
import Navbar from '../navbar/Navbar'
import AppLayout from './AppLayout'
import VendorDashboardNavigation from './VendorDashboardNavigation'

import { useSelector } from 'react-redux'

const VendorDashboardLayout: React.FC = ({ children }) => {

  const {user} = useSelector(state => state.authReducer)
  console.log({user})

  return (
    <AppLayout navbar={<Navbar />}>
      <Container sx={{ my: '2rem' }}>
        <Grid container spacing={3}>
          <Grid
            item
            lg={3}
            xs={12}
            sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
          >
            {
              user?.roles.filter(el => el.name === 'SHOP_ADMIN').length ?  <VendorDashboardNavigation /> : null
            }
          </Grid>
          <Grid item lg={9} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  )
}

export default VendorDashboardLayout
