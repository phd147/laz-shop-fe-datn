import AddressEditor from '@component/address/AddressEditor'
import DashboardLayout from '@component/layout/CustomerDashboardLayout'
import React from 'react'
import { useRouter } from 'next/router'

const AddressUpdater = () => {

  const router = useRouter();

  const {id} = router.query ;
  return (
    <DashboardLayout>
      <AddressEditor id={id} type={'EDIT'} />
    </DashboardLayout>
  )
}

export default AddressUpdater
