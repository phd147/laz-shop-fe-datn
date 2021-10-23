import FlexBox from '@component/FlexBox'
import CustomerDashboardLayout from '@component/layout/CustomerDashboardLayout'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import TableRow from '@component/TableRow'
import { H3, H5, Small } from '@component/Typography'
import { Avatar, Button, Card, Grid, Typography } from '@material-ui/core'
import Person from '@material-ui/icons/Person'
import { Box } from '@material-ui/system'
import { format } from 'date-fns'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { TypeLogin } from '../../src/constants/user'

const Profile = () => {

  const { user } = useSelector(state => state.authReducer)

  const [infor, setInfor] = useState({
    avatarUrl: '',
    firstName: '',
    lastName: '',
    email: '',
  })

  useEffect(() => {
  }, [])

  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        icon={Person}
        title='My Profile'
        button={user.type === TypeLogin.LOCAL ?
          <Link href='/profile/edit'>
            <Button color='primary' sx={{ px: '2rem', bgcolor: 'primary.light' }}>
              Edit Profile
            </Button>
          </Link> : null
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card
              sx={{
                display: 'flex',
                p: '14px 32px',
                height: '100%',
                alignItems: 'center',
              }}
            >
              <Avatar
                src={user?.info?.picture}
                sx={{ height: 64, width: 64 }}
              />
              <Box ml={1.5} flex='1 1 0'>
                <FlexBox
                  flexWrap='wrap'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <div>
                    <H5 my='0px'>{user?.info?.name}</H5>
                    <FlexBox alignItems='center'>
                      <Typography color='grey.600'>Balance:</Typography>
                      <Typography ml={0.5} color='primary.main'>
                        $500
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography color='grey.600' letterSpacing='0.2em'>
                   {user.type}
                  </Typography>
                </FlexBox>
              </Box>
            </Card>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      p: '1rem 1.25rem',
                    }}
                  >
                    <H3 color='primary.main' my='0px' fontWeight='600'>
                      {item.title}
                    </H3>
                    <Small color='grey.600' textAlign='center'>
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow sx={{ p: '0.75rem 1.5rem' }}>
        <FlexBox flexDirection='column' p={1}>
          <Small color='grey.600' mb={0.5} textAlign='left'>
            First Name
          </Small>
          <span>{'family name'}</span>
        </FlexBox>
        <FlexBox flexDirection='column' p={1}>
          <Small color='grey.600' mb={0.5} textAlign='left'>
            Last Name
          </Small>
          <span>{'first name'}</span>
        </FlexBox>
        <FlexBox flexDirection='column' p={1}>
          <Small color='grey.600' mb={0.5} textAlign='left'>
            Email
          </Small>
          <span>{user?.info?.email}</span>
        </FlexBox>
        <FlexBox flexDirection='column' p={1}>
          <Small color='grey.600' mb={0.5} textAlign='left'>
            Phone
          </Small>
          <span>+1983649392983</span>
        </FlexBox>
        <FlexBox flexDirection='column' p={1}>
          <Small color='grey.600' mb={0.5}>
            Birth date
          </Small>
          <span className='pre'>
            {format(new Date(1996 / 11 / 16), 'dd MMM, yyyy')}
          </span>
        </FlexBox>
      </TableRow>
    </CustomerDashboardLayout>
  )
}

const infoList = [
  {
    title: '16',
    subtitle: 'All Orders',
  },
  {
    title: '02',
    subtitle: 'Awaiting Payments',
  },
  {
    title: '00',
    subtitle: 'Awaiting Shipment',
  },
  {
    title: '01',
    subtitle: 'Awaiting Delivery',
  },
]

export default Profile
