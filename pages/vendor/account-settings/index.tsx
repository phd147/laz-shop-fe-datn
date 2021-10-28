import Card1 from '@component/Card1'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
import countryList from '@data/countryList'
import { Autocomplete, Avatar, Button, Grid, TextField } from '@material-ui/core'
import CameraAlt from '@material-ui/icons/CameraAlt'
import Settings from '@material-ui/icons/Settings'
import { Box } from '@material-ui/system'
import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { instance } from '../../../src/api/api'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const AccountSettings = () => {

  const { user } = useSelector(state => state.authReducer)

  const [avatarUrl, setAvatarUrl] = useState('')
  const [coverUrl, setCoverUrl] = useState('')

  const formilkRef = useRef()

  const getShopDetail = async () => {
    try {
      const res = await instance.get(`/shops/${user?.shop?.id}`)
      const { data } = res
      const { name, email, address, phoneNumber, description, avatarUrl: avatar, coverUrl: cover } = data
      setAvatarUrl(avatar)
      setCoverUrl(cover)
      if (formilkRef.current) {
        formilkRef.current.setFieldValue('name', name)
        formilkRef.current.setFieldValue('email', email)
        formilkRef.current.setFieldValue('address', address)
        formilkRef.current.setFieldValue('phoneNumber', phoneNumber)
        formilkRef.current.setFieldValue('description', description)
      }
    } catch (err) {
      toast.error('Error')
    }
  }

  useEffect(() => {
    getShopDetail()
  }, [])


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

  const handleFormSubmit = async (values: any) => {
    console.log(values)
    try {
      const res = await instance.patch('/shops', {
        ...values,
        avatarUrl, coverUrl,
      })
      toast.success('OK')
    } catch (err) {
      toast.error('Error')
    }
  }

  return (
    <VendorDashboardLayout>
      <DashboardPageHeader title='Account' icon={Settings} />

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
              style=
                {
                  {
                    display: 'none',
                  }
                }
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
                    />
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      name='phoneNumber'
                      label='Phone number'
                      fullWidth
                      type='tel'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phoneNumber || ''}
                      error={!!touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name='description'
                      label='Description'
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description || ''}
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description} multiline
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
  email: '',
  address: null,
  phoneNumber: '',
  description: '',
}

const accountSchema = yup.object().shape({
  name: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  address: yup.string().required('required'),
  phoneNumber: yup.string().required('required'),
  description: yup.string().required('required'),
})

export default AccountSettings
