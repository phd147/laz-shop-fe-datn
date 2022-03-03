import Card1 from '@component/Card1'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
// import countryList from '@data/countryList'
import { Autocomplete, Avatar, Button, Grid, MenuItem, TextField } from '@material-ui/core'
import CameraAlt from '@material-ui/icons/CameraAlt'
import Settings from '@material-ui/icons/Settings'
import { Box } from '@material-ui/system'
import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { instance } from '../../../src/api/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const AccountSettings = () => {

  const router = useRouter()

  const [avatarUrl, setAvatarUrl] = useState('')
  const [coverUrl, setCoverUrl] = useState('')

  const formilkRef = useRef()

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


  const handleFormSubmit = async (values: any) => {
    try {
      await instance.post('/shops', {
        ...values,
        avatarUrl,
        coverUrl,
      })
      toast.success('OK')
      router.push('/vendor/dashboard')

    } catch (err) {
      console.log({ err })
      toast.error('Error')
    }
  }

  const handleCoverChange = async (event: any) => {
    const formData = new FormData()
    formData.append('media', event.target.files[0])
    try {
      // @ts-ignore
      const res = await instance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setCoverUrl(res.data)
    } catch (err) {
      console.log({ err })
      toast.error('Error')
    }
  }

  const handleAvatarChange = async (event: any) => {
    const formData = new FormData()
    formData.append('media', event.target.files[0])
    try {
      // @ts-ignore
      const res = await instance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setAvatarUrl(res.data)
    } catch (err) {
      console.log({ err })
      toast.error('Error')
    }
  }

  useEffect(() => {
    initProvince();
  },[])

  return (
    <VendorDashboardLayout>
      <DashboardPageHeader title='Register shop' icon={Settings} />

      {/* p="24px 30px" */}
      <Card1>
        <Box
          borderRadius='10px'
          overflow='hidden'
          height='173px'
          mb={3}
          position='relative'
          style={{
            background: `url(${coverUrl}) center/cover`,
          }}
        >
          <Box
            display='flex'
            alignItems='flex-end'
            position='absolute'
            bottom='20px'
            left='24px'
          >
            <Avatar
              src={avatarUrl}
              sx={{
                height: 80,
                width: 80,
                border: '4px solid',
                borderColor: 'grey.100',
              }}
            />

            <Box ml={-2.5} zIndex={12}>
              <label htmlFor='profile-image'>
                <Button
                  component='span'
                  size='small'
                  color='secondary'
                  sx={{
                    bgcolor: 'grey.300',
                    height: 'auto',
                    p: '6px',
                    borderRadius: '50%',
                  }}
                >
                  <CameraAlt fontSize='small' />
                </Button>
              </label>
            </Box>
            <input
              onChange={handleAvatarChange}
              id='profile-image'
              accept='image/*'
              type='file'
              style={{ display: 'none' }}
              name={'avatar'}
            />
          </Box>

          <Box
            display='flex'
            alignItems='flex-end'
            position='absolute'
            top='20px'
            right='24px'
          >
            <label htmlFor='cover-image'>
              <Button
                component='span'
                size='small'
                color='secondary'
                sx={{
                  bgcolor: 'primary.light',
                  height: 'auto',
                  p: '6px',
                  borderRadius: '50%',
                }}
              >
                <CameraAlt fontSize='small' color='primary' />
              </Button>
            </label>
            <input
              className='hidden'
              onChange={handleCoverChange}
              id='cover-image'
              accept='image/*'
              type='file'
              style={{ display: 'none' }}
            />
          </Box>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={accountSchema}
          onSubmit={handleFormSubmit}
          innerRef={formilkRef}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
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
                      multiline
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      name='email'
                      type='email'
                      label='Email'
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email || ''}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  {/*<Grid item md={6} xs={12}>*/}
                  {/*  <TextField*/}
                  {/*    name='phoneNumber'*/}
                  {/*    label='Phone'*/}
                  {/*    fullWidth*/}
                  {/*    type='tel'*/}
                  {/*    onBlur={handleBlur}*/}
                  {/*    onChange={handleChange}*/}
                  {/*    value={values.phoneNumber || ''}*/}
                  {/*    error={!!touched.phoneNumber && !!errors.phoneNumber}*/}
                  {/*    helperText={touched.phoneNumber && errors.phoneNumber}*/}
                  {/*  />*/}
                  {/*</Grid>*/}
                  <Grid item md={6} xs={12}>
                    <TextField
                      name='description'
                      label='Description'
                      fullWidth
                      type='text'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description || ''}
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                      multiline
                    />
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
    </VendorDashboardLayout>
  )
}

const initialValues = {
  name: '',
  address: '',
  phoneNumber: '',
  email: '',
  description: '',
  districtId : '',
  provinceId : '',
  wardCode : ''
}

const accountSchema = yup.object().shape({
  name: yup.string().required('required'),
  address: yup.mixed().required('required'),
  phoneNumber: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  description: yup.string(),
  districtId: yup.number().integer().required('required'),
  provinceId: yup.number().integer().required('required'),
  wardCode: yup.string().required('required'),
})

export default AccountSettings
