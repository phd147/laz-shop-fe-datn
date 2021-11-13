import DropZone from '@component/DropZone'
import DeliveryBox from '@component/icons/DeliveryBox'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
import { Avatar, Button, Card, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { instance } from '../../../src/api/api'
import { toast } from 'react-toastify'
import { Box } from '@material-ui/system'
import CameraAlt from '@material-ui/icons/CameraAlt'

const OrderDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const formikRef = useRef();

  const [imageUrl, setImageUrl] = useState('')

  const [categories, setCategories] = useState([]);


  const getCategories = async() => {
    try {
        const res = await instance.get('/products');
        setCategories(res.data);
    }catch(err){
      toast.error(err.response?.data?.message);
    }
  }


  const getProductDetail = async () => {
    try {
      const res = await instance.get(`/items/${id}`)
      const { data } = res
      console.log({ data, formikRef})
      const { name, amount, price, imageUrl, description, products } = data
      console.log({data})
      const categoryId = products[0].id
      if (formikRef.current) {
        formikRef.current.setFieldValue('name',name);
        formikRef.current.setFieldValue('amount',amount);
        formikRef.current.setFieldValue('price',price);
        formikRef.current.setFieldValue('description',description);
        formikRef.current.setFieldValue('categoryId',categoryId);
        setImageUrl(imageUrl)
      }
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
    } catch (err) {
      console.log({ err })
    }
  }

  const handleFormSubmit = async (values: any) => {
    try {
        await instance.patch(`/items/${id}`, {
          ...values,imageUrl
        })
      toast.success('OK');
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    getCategories();
    getProductDetail()
  }, [])

  return (
    <VendorDashboardLayout>
      <DashboardPageHeader
        title='Edit Product'
        icon={DeliveryBox}
        button={
          <Link href='/vendor/products'>
            <Button color='primary' sx={{ bgcolor: 'primary.light', px: '2rem' }}>
              Back to Product List
            </Button>
          </Link>
        }
      />

      <Card sx={{ p: '30px' }}>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
          innerRef={formikRef}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
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
                <Grid item sm={6} xs={12}>
                  <TextField
                    name='categoryId'
                    label='Select Category'
                    placeholder='Category'
                    fullWidth
                    select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.categoryId || ''}
                    error={!!touched.categoryId && !!errors.categoryId}
                    helperText={touched.categoryId && errors.categoryId}
                  >
                    {
                      categories.map(category => (
                      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                      ))
                    }
                  </TextField>
                </Grid>
                <Grid justifyContent={'center'} item xs={12}>
                  {/*<DropZone*/}
                  {/*  onChange={onChangeHandler}*/}
                  {/*  imageUrl={imageUrl}*/}
                  {/*/>*/}
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
                        onChange={(e)  => onChangeHandler(e.target.files)}
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
                <Grid item sm={6} xs={12}>
                  <TextField
                    name='amount'
                    label='Amount'
                    placeholder='Amount'
                    fullWidth
                    type='number'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amount || ''}
                    error={!!touched.amount && !!errors.amount}
                    helperText={touched.amount && errors.amount}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
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

              </Grid>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                sx={{ mt: '25px' }}
              >
                Update product
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </VendorDashboardLayout>
  )
}

const initialValues = {
  name: '',
  price: '',
  description: '',
  amount: 1,
  categoryId: 0,
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required('required'),
  categoryId: yup.number().required('required'),
  price: yup.number().required('required'),
  amount: yup.number().required('required'),
  description: yup.string().required(),
})

export default OrderDetails
