import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
import VendorOrderList from '@component/orders/VendorOrderList'
import { Message as MessageIcon } from '@material-ui/icons'


const Orders = () => {


  // @ts-ignore
  return (

    <VendorDashboardLayout>
      <DashboardPageHeader title='Messages' icon={MessageIcon} />
      <div>
        chat
      </div>
    </VendorDashboardLayout>
  )
}

export default Orders
