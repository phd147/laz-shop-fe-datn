import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
import VendorOrderList from '@component/orders/VendorOrderList'
import { Message as MessageIcon } from '@material-ui/icons'
import { ChatType } from '../../../src/constants/chat'
import Chat from '@component/chat/chat'
import React from 'react'


const Orders = () => {


  // @ts-ignore
  return (

    <VendorDashboardLayout>
      <DashboardPageHeader title='Messages' icon={MessageIcon} />
      <div>
        <Chat chatType={ChatType.USER}  height={'500px'} />
      </div>
    </VendorDashboardLayout>
  )
}

export default Orders
