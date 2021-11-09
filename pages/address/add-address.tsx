import AddressEditor from '@component/address/AddressEditor'
import DashboardLayout from '@component/layout/CustomerDashboardLayout'
import React from 'react'
import { useRouter } from 'next/router'

const AddressUpdater = () => {

  return (
    <DashboardLayout>
      <AddressEditor type={'ADD'} />
    </DashboardLayout>
  )
}

export default AddressUpdater
