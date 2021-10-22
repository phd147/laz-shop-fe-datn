import DropZone from '@component/DropZone'
import DeliveryBox from '@component/icons/DeliveryBox'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import VendorDashboardLayout from '@component/layout/VendorDashboardLayout'
import { Button, Card, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { instance } from '../../../src/api/api'

const OrderDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const formikRef = useRef();

  const [imageUrl, setImageUrl] = useState(null)


  const [productDetail, setProductDetail] = useState({
    name: '',
    price: '',
    description: '',
    amount: 69,
    imageUrl: '',
    categoryId: 1,
  })

  const getProductDetail = async () => {
    try {
      let categoryId = 1 ;
      const res = await instance.get(`/items/${id}`)
      console.log({ res })
      const { data } = res
      const { name, amount, price, imageUrl, description } = data
      if (formikRef.current) {
        formikRef.current.setFieldValue(
          "name",name
        );
        formikRef.current.setFieldValue(
          "price",
          price
        );
        formikRef.current.setFieldValue(
          "description",
          description
        );
        formikRef.current.setFieldValue(
          "amount",
          amount
        );
        formikRef.current.setFieldValue(
          "imageUrl",
          imageUrl
        );
        formikRef.current.setFieldValue(
          "categoryId",
          categoryId
        );

      }
    } catch (err) {
      console.log({ err })
    }
  }

  const onChangeHandler = async (files: any, setFieldValue: any) => {
    console.log({ files })
    const formData = new FormData()
    formData.append('media', files[0])
    try {
      // @ts-ignore
      const res = await instance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setImageUrl(res.data)
      setFieldValue('imageUrl', res.data)
      console.log({ res })
    } catch (err) {
      console.log({ err })
    }
  }

  const handleFormSubmit = async (values: any) => {
    console.log(values)
  }

  useEffect(() => {
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
          initialValues={productDetail}
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
                    name='category'
                    label='Select Category'
                    placeholder='Category'
                    fullWidth
                    select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category || ''}
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                  >
                    <MenuItem value='electronics'>Electronics</MenuItem>
                    <MenuItem value='fashion'>Fashion</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <DropZone
                    onChange={onChangeHandler}
                    imageUrl={imageUrl}
                  />
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
                    name='stock'
                    label='Stock'
                    placeholder='Stock'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.stock || ''}
                    error={!!touched.stock && !!errors.stock}
                    helperText={touched.stock && errors.stock}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name='tags'
                    label='Tags'
                    placeholder='Tags'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.tags || ''}
                    error={!!touched.tags && !!errors.tags}
                    helperText={touched.tags && errors.tags}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name='price'
                    label='Regular Price'
                    placeholder='Regular Price'
                    type='number'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price || ''}
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name='sale_price'
                    label='Sale Price'
                    placeholder='Sale Price'
                    type='number'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.sale_price || ''}
                    error={!!touched.sale_price && !!errors.sale_price}
                    helperText={touched.sale_price && errors.sale_price}
                  />
                </Grid>
              </Grid>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                sx={{ mt: '25px' }}
              >
                Save product
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
  amount: 69,
  imageUrl: '',
  categoryId: 1,
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required('required'),
  categoryId: yup.number(),
  price: yup.number().required('required'),
  amount: yup.number().required('required'),
  imageUrl: yup.string(),
  description: yup.string(),
})

export default OrderDetails
