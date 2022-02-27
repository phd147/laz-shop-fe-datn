import VendorAnalyticsChart from '@component/dashboard/VendorAnalyticsChart'
import FlexBox from '@component/FlexBox'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
import { H1, H5, Paragraph } from '@component/Typography'
import { Avatar, Card, Grid } from '@material-ui/core'
import ShoppingBag from '@material-ui/icons/ShoppingBag'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { instance } from '../../../src/api/api'

const VendorDashboard = () => {

  const [balance,setBalance] = useState(0);

  const [shopOverview, setShopOverview] = useState({
    totalCustomer: 0,
    totalOrders: 0,
    totalPendingOrders: 0,
    totalProduct: 0,
  })


  const getShopToken = async () => {
    try {
      const res = await instance.get('/balance/shop')
      setBalance(res.data.balance);
    }catch(err){
      toast.error('Error')
    }
  }

  const getShopOverview = async () => {
    try {
      const res = await instance.get('/shop/overview');
      setShopOverview(res.data)
    }catch(err){
      toast.error('Error')
    }
  }


  useEffect(() => {
    getShopToken();
    getShopOverview()
  },[])


  const cardList = [
    {
      title: 'Total products',
      amount: shopOverview.totalProduct,
    },
    {
      title: 'Your balance',
      amount: `${balance}$`,
    },
    {
      title: 'Total Orders',
      amount: shopOverview.totalOrders,
    },
    {
      title: 'Pending Orders',
      amount: shopOverview.totalPendingOrders,
    },
  ]


  return (
    <VendorDashboardLayout>
      <DashboardPageHeader title="Dashboard" icon={ShoppingBag} />

      <Grid container spacing={3}>
        {cardList.map((item, ind) => (
          <Grid item lg={6} md={6} sm={6} xs={12} key={ind}>
            <Card sx={{ textAlign: 'center', py: '1.5rem', height: '100%' }}>
              <H5 color="grey.600" mb={1}>
                {item.title}
              </H5>
              <H1 color="grey.700" mb={0.5} lineHeight="1.3">
                {item.amount}
              </H1>
              <Paragraph color="grey.600">{item.subtitle}</Paragraph>
            </Card>
          </Grid>
        ))}

        {/*<Grid item lg={8} xs={12}>*/}
        {/*  <Card sx={{ p: '20px 30px' }}>*/}
        {/*    <H5 mb={3}>Sales</H5>*/}
        {/*    <VendorAnalyticsChart />*/}
        {/*  </Card>*/}
        {/*</Grid>*/}

        {/*<Grid item lg={4} xs={12}>*/}
        {/*  <Card sx={{ p: '20px 30px' }}>*/}
        {/*    <H5>Top Countries</H5>*/}
        {/*    {topCountryList.map((item, ind) => (*/}
        {/*      <FlexBox*/}
        {/*        alignItems="center"*/}
        {/*        justifyContent="space-between"*/}
        {/*        my="1rem"*/}
        {/*        key={ind}*/}
        {/*      >*/}
        {/*        <FlexBox alignItems="center">*/}
        {/*          <Avatar*/}
        {/*            src={item.flagUrl}*/}
        {/*            sx={{ mr: '8px', height: 30, width: 30 }}*/}
        {/*          />*/}
        {/*          <span>{item.name}</span>*/}
        {/*        </FlexBox>*/}
        {/*        <H5>${item.amount}</H5>*/}
        {/*      </FlexBox>*/}
        {/*    ))}*/}
        {/*  </Card>*/}
        {/*</Grid>*/}
      </Grid>
    </VendorDashboardLayout>
  )
}



// USE COUNTRY CODE TO FETCH FLAG
const topCountryList = [
  {
    name: 'United States',
    amount: 130,
    flagUrl: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg',
  },
  {
    name: 'United Kingdom',
    amount: 110,
    flagUrl: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg',
  },
  {
    name: 'Canada',
    amount: 100,
    flagUrl: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/CA.svg',
  },
  {
    name: 'India',
    amount: 80,
    flagUrl: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/IN.svg',
  },
  {
    name: 'Jordan',
    amount: 80,
    flagUrl: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/JO.svg',
  },
  {
    name: 'Brazil',
    amount: 70,
    flagUrl: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg',
  },
]

export default VendorDashboard
