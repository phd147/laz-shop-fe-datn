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

const OrderDetails = () => {
  const [subCategoryDisabled, setSubCategoryDisabled] = useState(true)
  const [categorySelected, setCategorySelected] = useState('0')
  // const [subCategorySelected, setSubCategorySelected] = useState('0')
  const [imageUrl, setImageUrl] = useState(null)
  const [categories, setCategories] = useState([])

  const router = useRouter()

  const [categoryName, setCategoryName] = useState('');


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
      const res = await instance.post('/items', values)
      console.log({ res })
      toast.success('OK')
      router.push('/vendor/products')
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
      const res = await instance.post('/avatar/upload', formData, {
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

  // const subCategoryDisabledState = {
  //   disabled: subCategoryDisabled,
  // }

  // function returnSubCategories(id: number) {
  //   if (!isNaN(id)) {
  //     const data = categories.find(value => value.id == id)
  //     if (data != null) {
  //       return (data.subcategory.map(value => {
  //         return (<MenuItem value={value.id}>{value.name}</MenuItem>)
  //       }))
  //     }
  //   }
  //   return (<MenuItem value='1'>No hay información</MenuItem>)
  // }

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
                {/*<Grid item sm={4} xs={12}>*/}
                {/*  <TextField*/}
                {/*    name='subcategory'*/}
                {/*    label='Select sub categories'*/}
                {/*    placeholder='Sub categories'*/}
                {/*    fullWidth*/}
                {/*    select*/}
                {/*    onBlur={handleBlur}*/}
                {/*    onChange={(e) => {*/}
                {/*      handleChange(e)*/}
                {/*      setSubCategorySelected(e.target.value)*/}
                {/*    }}*/}
                {/*    value={values.subcategory || ''}*/}
                {/*    error={!!touched.subcategory && !!errors.subcategory}*/}
                {/*    helperText={touched.subcategory && errors.subcategory}*/}
                {/*    inputProps={subCategoryDisabledState}*/}
                {/*  >*/}
                {/*    {categorySelected && returnSubCategories(parseInt(categorySelected))}*/}
                {/*  </TextField>*/}
                {/*</Grid>*/}
                <Grid item xs={12}>
                  <DropZone
                    onChange={(files) => onChangeHandler(files, setFieldValue)}
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
                {/*<Grid item sm={4} xs={12}>*/}
                {/*  <TextField*/}
                {/*    name='unit'*/}
                {/*    label='Seleccionar Unidad'*/}
                {/*    placeholder='Unidad'*/}
                {/*    fullWidth*/}
                {/*    select*/}
                {/*    onBlur={handleBlur}*/}
                {/*    onChange={handleChange}*/}
                {/*    value={values.unit || ''}*/}
                {/*    error={!!touched.unit && !!errors.unit}*/}
                {/*    helperText={touched.unit && errors.unit}*/}
                {/*  >*/}
                {/*    {units.map(value => <MenuItem value={value.id}>{value.name}</MenuItem>)}*/}
                {/*  </TextField>*/}
                {/*</Grid>*/}
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
              </Grid>
            </Card>
            {/*<Card sx={{ p: '30px', marginTop: '10px' }} variant='outlined'>*/}
            {/*  <h3>Venta al publico</h3>*/}
            {/*  <Grid container spacing={3}>*/}
            {/*    <Grid item sm={4} xs={12}>*/}
            {/*      <TextField*/}
            {/*        name='stock_sale'*/}
            {/*        label='Cantidad minima'*/}
            {/*        placeholder='Cantidad minima'*/}
            {/*        type='number'*/}
            {/*        fullWidth*/}
            {/*        onBlur={handleBlur}*/}
            {/*        onChange={handleChange}*/}
            {/*        value={values.stock_sale || ''}*/}
            {/*        error={!!touched.stock_sale && !!errors.stock_sale}*/}
            {/*        helperText={touched.stock_sale && errors.stock_sale}*/}
            {/*      />*/}
            {/*    </Grid>*/}
            {/*    <Grid item sm={4} xs={12}>*/}
            {/*      <TextField*/}
            {/*        name='unit_sale'*/}
            {/*        label='Seleccionar Unidad'*/}
            {/*        placeholder='Unidad'*/}
            {/*        fullWidth*/}
            {/*        select*/}
            {/*        onBlur={handleBlur}*/}
            {/*        onChange={handleChange}*/}
            {/*        value={values.unit_sale || ''}*/}
            {/*        error={!!touched.unit_sale && !!errors.unit_sale}*/}
            {/*        helperText={touched.unit_sale && errors.unit_sale}*/}
            {/*      >*/}
            {/*        {units.map(value => <MenuItem value={value.id}>{value.name}</MenuItem>)}*/}
            {/*      </TextField>*/}
            {/*    </Grid>*/}
            {/*    <Grid item sm={4} xs={12}>*/}
            {/*      <TextField*/}
            {/*        name='sale_price'*/}
            {/*        label='Precio de venta'*/}
            {/*        placeholder='Precio de venta'*/}
            {/*        type='number'*/}
            {/*        fullWidth*/}
            {/*        onBlur={handleBlur}*/}
            {/*        onChange={handleChange}*/}
            {/*        value={values.sale_price || ''}*/}
            {/*        error={!!touched.sale_price && !!errors.sale_price}*/}
            {/*        helperText={touched.sale_price && errors.sale_price}*/}
            {/*      />*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            {/*</Card>*/}
            {/*<Card sx={{ p: '30px', marginTop: '10px' }} variant='outlined'>*/}
            {/*  <h3>Otros</h3>*/}
            {/*  <Grid container spacing={3}>*/}
            {/*    <Grid item sm={6} xs={12}>*/}
            {/*      <TextField*/}
            {/*        name='tags'*/}
            {/*        label='Tags'*/}
            {/*        placeholder='Tags'*/}
            {/*        fullWidth*/}
            {/*        onBlur={handleBlur}*/}
            {/*        onChange={handleChange}*/}
            {/*        value={values.tags || ''}*/}
            {/*        error={!!touched.tags && !!errors.tags}*/}
            {/*        helperText={touched.tags && errors.tags}*/}
            {/*      />*/}
            {/*    </Grid>*/}
            {/*    <Grid item sm={6} xs={12}>*/}
            {/*      <TextField*/}
            {/*        name='code'*/}
            {/*        label='Codigo de barras'*/}
            {/*        placeholder='Codigo de barras'*/}
            {/*        disabled={true}*/}
            {/*        fullWidth*/}
            {/*        onBlur={handleBlur}*/}
            {/*        onChange={handleChange}*/}
            {/*        value={categorySelected.toString().padStart(3,"0") + subCategorySelected.toString().padStart(3,"0")}*/}
            {/*        error={!!touched.code && !!errors.code}*/}
            {/*        helperText={touched.code && errors.code}*/}
            {/*      />*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            {/*</Card>*/}
            <Button
              variant='outlined'
              color='info'
              type='submit'
              sx={{ mt: '25px' }}
              startIcon={<SaveIcon />}
            >
              Guardar producto
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
  // stock: '',
  price: 12,
  // sale_price: '',
  description: '',
  // tags: '',
  // category: '',
  // subcategory: '',
  // unit: '',
  // code: '',
  // stock_sale: '',
  // unit_sale: '',
  amount: 69,
  imageUrl: '',
  categoryId: 1,
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required('required'),
  categoryId: yup.number(),
  // subcategory: yup.string().required('required'),
  // unit: yup.string().required('required'),
  // stock: yup.number().required('required'),
  price: yup.number().required('required'),
  // sale_price: yup.number().required('required'),
  // stock_price: yup.number().required('required'),
  // unit_sale: yup.string().required('required'),
  amount: yup.number().required('required'),
  imageUrl: yup.string(),
  description: yup.string(),
})

export default OrderDetails
