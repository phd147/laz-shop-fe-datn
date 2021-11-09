import FlexBox from '@component/FlexBox'
import DashboardLayout from '@component/layout/CustomerDashboardLayout'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import TableRow from '@component/TableRow'
import { Button, IconButton, Pagination, Typography } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Place from '@material-ui/icons/Place'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { instance } from '../../src/api/api'

const AddressList = () => {

  const router = useRouter();

  const [addresses, setAddresses] = useState([]);

  const [totalPage, setTotalPage] = useState(0);

  const [perPage, setPerPage] = useState(10);

  const fetchAddress =  async (page  : number = 1) => {
    try {
      const res = await instance.get(`/addresses?page=${page}&limit=${perPage}`);
      setAddresses(res.data.items);
      setTotalPage(res.data.last_page);
    }catch(err){
      toast.error('Error');
    }
  }

  useEffect(() => {
    fetchAddress();
  },[])


  return (
    <DashboardLayout>
      <DashboardPageHeader
        title="My Addresses"
        icon={Place}
        button={
          <Button color="primary" sx={{ bgcolor: 'primary.light', px: '2rem' }} onClick={() => router.push('/address/add-address')}>
            Add New Address
          </Button>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      {addresses.map((item, ind) => (
        <TableRow sx={{ my: '1rem', padding: '6px 18px' }} key={ind}>
          <Typography whiteSpace="pre" m={0.75} textAlign="left">
            {item.name}
          </Typography>
          <Typography flex="1 1 260px !important" m={0.75} textAlign="left">
            {item.address}
          </Typography>
          <Typography whiteSpace="pre" m={0.75} textAlign="left">
            {item.phoneNumber}
          </Typography>

          <Typography whiteSpace="pre" textAlign="center" color="grey.600">
            <Link href={`/address/${item.id}`}>
              <IconButton>
                <Edit fontSize="small" color="inherit" />
              </IconButton>
            </Link>
            <IconButton onClick={(e) => e.stopPropagation()}>
              <Delete fontSize="small" color="inherit" />
            </IconButton>
          </Typography>
        </TableRow>
      ))}

      <FlexBox justifyContent="center" mt={5}>
        <Pagination
          count={totalPage}
          onChange={(event,value) => {
            fetchAddress(value);
          }}
        />
      </FlexBox>
    </DashboardLayout>
  )
}

export default AddressList
