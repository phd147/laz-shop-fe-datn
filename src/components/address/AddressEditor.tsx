import Card1 from '@component/Card1'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import { Button, Grid, MenuItem, TextField } from '@material-ui/core'
import Place from '@material-ui/icons/Place'
import { Box } from '@material-ui/system'
import { Formik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import DashboardLayout from '../layout/CustomerDashboardLayout'
import { instance } from '../../api/api'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'


const AddressEditor = ({ type, id,toggleDialog,setAddresses }) => {

  const router = useRouter()

  const formikRef= useRef();

  const handleFormSubmit = async (values: any) => {
    switch (type) {
      case 'DIALOG':
        try {
          const res = await instance.post('/addresses', values)
          toast.success('OK');
          toggleDialog();
          setAddresses( addresses => addresses.concat(res.data));
        } catch (err) {
          toast.error('Error')
        }
        break
      case 'ADD' :
        try {
          const res = await instance.post('/addresses', values)
          toast.success('OK');
          router.push('/address')
        } catch (err) {
          toast.error('Error')
        }
        break
      case 'EDIT' :
        try {
          const res = await instance.patch(`/addresses/${id}`, values)
          toast.success('OK');
        } catch (err) {
          toast.error('Error')
        }
        break
      default :
        break
    }

  }

  const [provinceIds, setProvinceIds] = useState([])
  const [districtIds, setDistricIds] = useState([])
  const [wardCodes, setWardCodes] = useState([])

  const initProvince = async () => {
    const provinceIdRes = await instance.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      headers: {
        // @ts-ignore
        'Token': process.env.NEXT_PUBLIC_GHN_TOKEN_API,
      },
      withCredentials: false,
    })
    setProvinceIds(provinceIdRes.data.data)
  }

  const initDistrict = async (provinceId) => {
    const districts = await instance.post('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
      province_id:provinceId ,
    }, {
      headers: {
        // @ts-ignore
        'Token': process.env.NEXT_PUBLIC_GHN_TOKEN_API,
      },
      withCredentials: false,
    })
    setDistricIds(districts.data.data)
  }

  const initWardCode = async  (districtId) => {
    const wardCodes = await instance.post('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id', {
      district_id:districtId,
    }, {
      headers: {
        // @ts-ignore
        'Token': process.env.NEXT_PUBLIC_GHN_TOKEN_API,
      },
      withCredentials: false,
    })

    setWardCodes(wardCodes.data.data)
  }


  const fetchAddressDetail = async () => {
    try {
      const res = await instance.get(`/addresses/${id}`);
      const { data } = res
      const {name,address ,districtId,provinceId,wardCode,phoneNumber} = data ;
      formikRef.current?.setValues({
        name ,
        address,
        districtId,
        provinceId,
        wardCode,
        phoneNumber,
      })
      await Promise.all([initWardCode(districtId),initDistrict(provinceId)])

    }catch(err){

    }
  }


  useEffect(() => {
    initProvince()
    if (type === 'EDIT') {
      fetchAddressDetail();
    }
  }, [])


  return (
    <div>
      <DashboardPageHeader
        icon={Place}
        title={ type === 'EDIT' ? 'Edit Address' : 'Add New Address'}
        button={
          <Link href='/address'>
            <Button color='primary' sx={{ bgcolor: 'primary.light', px: '2rem' }}>
              Back to Address
            </Button>
          </Link>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Card1>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
          innerRef={formikRef}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name='name'
                      label='Name'
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name || ''}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name='address'
                      label='Address'
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address || ''}
                      error={!!touched.address && !!errors.address}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name='phoneNumber'
                      label='Phone'
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phoneNumber || ''}
                      error={!!touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name='provinceId'
                      label='Select province'
                      placeholder='Provinces'
                      fullWidth
                      select
                      onBlur={handleBlur}
                      onChange={async (e) => {
                        handleChange(e)
                        // setCategorySelected(e.target.value)
                        // setSubCategoryDisabled(false)
                        setFieldValue('provinceId', e.target.value)
                        initDistrict(e.target.value)

                      }}
                      value={values.provinceId}
                      error={!!touched.provinceId && !!errors.provinceId}
                      helperText={touched.provinceId && errors.provinceId}
                    >
                      {provinceIds.map(province => <MenuItem key={province.ProvinceID}
                                                             value={province.ProvinceID}>{province.ProvinceName}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name='districtId'
                      label='Select district'
                      placeholder='District'
                      fullWidth
                      select
                      onBlur={handleBlur}
                      onChange={async (e) => {
                        handleChange(e)
                        setFieldValue('districtId', e.target.value)
                        initWardCode(e.target.value)
                      }}
                      value={values.districtId}
                      error={!!touched.districtId && !!errors.districtId}
                      helperText={touched.districtId && errors.districtId}
                    >
                      {districtIds.map(district => <MenuItem key={district.DistrictID}
                                                             value={district.DistrictID}>{district.DistrictName}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name='wardCode'
                      label='Select WardCode'
                      placeholder='WardCode'
                      fullWidth
                      select
                      onBlur={handleBlur}
                      onChange={async (e) => {
                        handleChange(e)
                        setFieldValue('wardCode', e.target.value)
                      }}
                      value={values.wardCode}
                      error={!!touched.wardCode && !!errors.wardCode}
                      helperText={touched.wardCode && errors.wardCode}
                    >
                      {wardCodes.map(wardCode => <MenuItem key={wardCode.WardCode}
                                                           value={wardCode.WardCode}>{wardCode.WardName}</MenuItem>)}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>

              <Button type='submit' variant='contained' color='primary'>
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  )
}

const initialValues = {
  name: '',
  address: '',
  districtId: '',
  provinceId: '',
  wardCode: '',
  phoneNumber: '',
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required('required'),
  address: yup.string().required('required'),
  districtId: yup.number().integer().required('required'),
  provinceId: yup.number().integer().required('required'),
  wardCode: yup.string().required('required'),
  phoneNumber: yup.string().required('required'),
})

AddressEditor.layout = DashboardLayout

export default AddressEditor
