import Card1 from '@component/Card1'
import FlexBox from '@component/FlexBox'
import CustomerDashboardLayout from '@component/layout/CustomerDashboardLayout'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import { Avatar, Button, Grid, TextField } from '@material-ui/core'
import CameraEnhance from '@material-ui/icons/CameraEnhance'
import Person from '@material-ui/icons/Person'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import DateTimePicker from '@material-ui/lab/DateTimePicker'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import { Box } from '@material-ui/system'
import { Formik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { instance } from '../../src/api/api'

const ProfileEditor = () => {


  const { user } = useSelector(state => state.authReducer)

  const [avatar, setAvatar] = useState(user.info.picture)


  const formilkRef = useRef()


  const handleFormSubmit = async (values: any) => {
    console.log(values)
  }

  const avatarChangeHandler = async (event) => {

    const formData = new FormData()
    formData.append('avatar', event.target.files[0])

    try {
      const res = await instance.post('/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setAvatar(res.data);

    } catch (err) {
      toast.error('Error')
    }
  }

  useEffect(() => {
    formilkRef.current.setFieldValue('name', user.info.name)
    formilkRef.current.setFieldValue('address', user.local.address)
    formilkRef.current.setFieldValue('loginId', user.info.email)
  }, [])

  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        icon={Person}
        title='Edit Profile'
        button={
          <Link href='/profile'>
            <Button color='primary' sx={{ px: '2rem', bgcolor: 'primary.light' }}>
              Back to Profile
            </Button>
          </Link>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Card1>
        <FlexBox alignItems='flex-end' mb={3}>
          <Avatar
            src={avatar}
            sx={{ height: 64, width: 64 }}
          />

          <Box ml={-2.5}>
            <label htmlFor='profile-image'>
              <Button
                component='span'
                color='secondary'
                sx={{
                  bgcolor: 'grey.300',
                  height: 'auto',
                  p: '8px',
                  borderRadius: '50%',
                }}
              >
                <CameraEnhance fontSize='small' />
              </Button>
            </label>
          </Box>
          <Box display='none'>
            <input
              onChange={avatarChangeHandler}
              id='profile-image'
              accept='image/*'
              type='file'
            />
          </Box>
        </FlexBox>

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
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
                      name='loginId'
                      type='email'
                      label='Email'
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.loginId || ''}
                      error={!!touched.loginId && !!errors.loginId}
                      helperText={touched.loginId && errors.loginId}
                    />
                  </Grid>
                  {/*<Grid item md={6} xs={12}>*/}
                  {/*  <TextField*/}
                  {/*    name='contact'*/}
                  {/*    label='Phone'*/}
                  {/*    fullWidth*/}
                  {/*    onBlur={handleBlur}*/}
                  {/*    onChange={handleChange}*/}
                  {/*    value={values.contact || ''}*/}
                  {/*    error={!!touched.contact && !!errors.contact}*/}
                  {/*    helperText={touched.contact && errors.contact}*/}
                  {/*  />*/}
                  {/*</Grid>*/}
                  {/*<Grid item md={6} xs={12}>*/}
                  {/*  <LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                  {/*    <DateTimePicker*/}
                  {/*      label='Birth Date'*/}
                  {/*      value={values.birth_date}*/}
                  {/*      maxDate={new Date()}*/}
                  {/*      inputFormat='dd MMMM, yyyy'*/}
                  {/*      shouldDisableTime={() => false}*/}
                  {/*      renderInput={(props) => (*/}
                  {/*        <TextField*/}
                  {/*          size='small'*/}
                  {/*          fullWidth*/}
                  {/*          {...props}*/}
                  {/*          error={*/}
                  {/*            (!!touched.birth_date && !!errors.birth_date) ||*/}
                  {/*            props.error*/}
                  {/*          }*/}
                  {/*          helperText={touched.birth_date && errors.birth_date}*/}
                  {/*        />*/}
                  {/*      )}*/}
                  {/*      onChange={(newValue) =>*/}
                  {/*        setFieldValue('birth_date', newValue)*/}
                  {/*      }*/}
                  {/*    />*/}
                  {/*  </LocalizationProvider>*/}
                  {/*</Grid>*/}
                </Grid>
              </Box>

              <Button type='submit' variant='contained' color='primary'>
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>
  )
}

const initialValues = {
  name: '',
  address: '',
  loginId: '',
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required('required'),
  address: yup.string().required('required'),
  loginId: yup.string().email('invalid email').required('required'),
})

export default ProfileEditor
