import DropZone from '@component/DropZone'
import DeliveryBox from '@component/icons/DeliveryBox'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
import { Button, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import SaveIcon from '@material-ui/icons/Save'
// import categories from '@data/categories'
// import units from '@data/units'
import Card from '@material-ui/core/Card'

import { instance } from '../../../src/api/api'
import { routes } from '../../../src/constants/route'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Box } from '@material-ui/system'
import CameraAlt from '@material-ui/icons/CameraAlt'

const OrderDetails = () => {
  const [subCategoryDisabled, setSubCategoryDisabled] = useState(true)
  const [categorySelected, setCategorySelected] = useState('0')
  // const [subCategorySelected, setSubCategorySelected] = useState('0')
  const [imageUrl, setImageUrl] = useState('')
  const [categories, setCategories] = useState([])

  const router = useRouter()

  const [categoryName, setCategoryName] = useState('')


  useEffect(() => {
    getCategories()
  }, [])


  const getCategories = async () => {
    try {
      const res = await instance.get('/products')
      console.log({ res })
      setCategories(res.data)
    } catch (err) {
      console.log({ err })
    }
  }

  const handleFormSubmit = async (values: any) => {
    console.log({ values })
    try {
      const res = await instance.post('/items', { ...values, imageUrl })
      toast.success('OK')
      router.push('/vendor/products')
    } catch (err) {
      console.log({ err })
    }
  }

  const onChangeHandler = async (files: any) => {
    console.log({ files })
    const formData = new FormData()
    formData.append('media', files[0])
    try {
      // @ts-ignore
      const res = await instance.post('/avatar/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setImageUrl(res.data)
      console.log({ res })
    } catch (err) {
      console.log({ err })
    }
  }

  return (
    <VendorDashboardLayout>
      <DashboardPageHeader
        title='Product'
        icon={DeliveryBox}
        button={
          <Link href='/vendor/products'>
            <Button color='info' sx={{ bgcolor: 'gray.500', px: '2rem' }}>
              All products
            </Button>
          </Link>
        }
      />

      {/*<Card sx={{ p: '30px' }}>*/}
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Card sx={{ p: '30px' }} variant='outlined'>
              <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                  <TextField
                    name='name'
                    label='Name'
                    placeholder='Name'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ''}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    name='categoryId'
                    label='Select categories'
                    placeholder='Categories'
                    fullWidth
                    select
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e)
                      // setCategorySelected(e.target.value)
                      // setSubCategoryDisabled(false)
                      setFieldValue('categoryId', e.target.value)
                      // const name = categories.filter(category => category.id === values.categoryId)[0]?.name
                      // setCategoryName(name)
                    }}
                    value={values.categoryId}
                    error={!!touched.categoryId && !!errors.categoryId}
                    helperText={touched.categoryId && errors.categoryId}
                  >
                    {categories.map(category => <MenuItem key={category.id}
                                                          value={category.id}>{category.name}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    borderRadius='10px'
                    overflow='hidden'
                    mb={3}
                    width={300}
                    height={300}
                    position='relative'
                    style={{
                      background: `url(${imageUrl || 'https://aina.vn/wp-content/uploads/2021/08/default-image-620x600-1.jpg'}) center/cover`,
                    }}
                  >
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
                        onChange={(e) => onChangeHandler(e.target.files)}
                        id='cover-image'
                        accept='image/*'
                        type='file'
                        style={{ display: 'none' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='description'
                    label='Description'
                    placeholder='Description'
                    rows={6}
                    multiline
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description || ''}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
              </Grid>
            </Card>
            <Card sx={{ p: '30px', marginTop: '10px' }} variant='outlined'>
              <h3>Inventario</h3>
              <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                  <TextField
                    name='amount'
                    label='Amount'
                    placeholder='Amount'
                    type='number'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amount || ''}
                    error={!!touched.amount && !!errors.amount}
                    helperText={touched.amount && errors.amount}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    name='price'
                    label='Price'
                    placeholder='Price'
                    type='number'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price || ''}
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    name='weight'
                    label='Weight'
                    placeholder='Weight (gram)'
                    type='number'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.weight || ''}
                    error={!!touched.weight && !!errors.weight}
                    helperText={touched.weight && errors.weight}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    name='width'
                    label='Width'
                    placeholder='Width (cm)'
                    type='number'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.width || ''}
                    error={!!touched.width && !!errors.width}
                    helperText={touched.width && errors.width}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    name='height'
                    label='Height'
                    placeholder='Height (cm)'
                    type='number'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.height || ''}
                    error={!!touched.height && !!errors.height}
                    helperText={touched.height && errors.height}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    name='length'
                    label='Length (cm)'
                    placeholder='Length (cm)'
                    type='number'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.length || ''}
                    error={!!touched.length && !!errors.length}
                    helperText={touched.length && errors.length}
                  />
                </Grid>
              </Grid>
            </Card>
            <Button
              variant='outlined'
              color='info'
              type='submit'
              sx={{ mt: '25px' }}
              startIcon={<SaveIcon />}
            >
              Add product
            </Button>
          </form>
        )}
      </Formik>
      {/*</Card>*/}
    </VendorDashboardLayout>
  )
}

const initialValues = {
  name: '',
  price: 1,
  description: '',
  amount: 1,
  categoryId: 1,
  weight: 0,
  width: 0,
  height: 0,
  length: 0,
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required('required'),
  categoryId: yup.number(),
  price: yup.number().required('required'),
  amount: yup.number().required('required'),
  description: yup.string(),
  weight: yup.number().required('required'),
  width: yup.number().required('required'),
  height: yup.number().required('required'),
  length: yup.number().required('required'),

})

export default OrderDetails
