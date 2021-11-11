import AddressEditor from '@component/address/AddressEditor'
import DashboardLayout from '@component/layout/CustomerDashboardLayout'
import React from 'react'

const AddressUpdater = () => {

  return (
    <DashboardLayout>
      <AddressEditor type={'ADD'} />
    </DashboardLayout>
  )
}

export default AddressUpdater
