import FlexBox from '@component/FlexBox'
import { H2, H5 } from '@component/Typography'
import { Box, Button, Pagination, TextField } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import ProductComment from './ProductComment'
import { toast } from 'react-toastify'
import { instance } from '../../api/api'
import { useSelector } from 'react-redux'

export interface ProductReviewProps {
  itemId: number,
  comments: [],
  action: object,
  lastPage: number
}

const ProductReview: React.FC<ProductReviewProps> = ({ comments, itemId, action, lastPage }) => {

  const { isLogin } = useSelector(state => state.authReducer)

  console.log({lastPage})

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    console.log(values)

    try {
      const res = await instance.post(`/items/${itemId}/comments`, values)
      resetForm()
      action.setComments(state => {
        const newState = [...state]
        newState.push(res.data)
        return newState
      })
      action.setTotalReview(state => state + 1)
      action.setLastPage(res.data.last_page)
      action.fetchProductDetail()
    } catch (err) {
      toast.error('Error')
    }
  }


  // TODO : call api get reaction of item

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: reviewSchema,
    onSubmit: handleFormSubmit,
  })

  return (
    <Box>
      {comments.map((item, ind) => (
        <ProductComment name={item.user.info.name} content={item.content} star={item.star} createdAt={item.createdAt}
                        picture={item.user.info.picture} key={ind} />
      ))}
      <FlexBox justifyContent='center' mt={5}>
        {!comments.length ? <h3>There are no reviews yet</h3> : <Pagination
          count={lastPage}
          variant='outlined'
          color='primary'
          onChange={(event, value) => {
            console.log(value)
            action.getComments(value)
          }}
        />}
      </FlexBox>
      {isLogin ?
        <>
          <H2 fontWeight='600' mt={7} mb={2.5}>
            Write a Review for this product
          </H2>

          <form onSubmit={handleSubmit}>
            <Box mb={2.5}>
              <FlexBox mb={1.5}>
                <H5 color='grey.700' mr={0.75}>
                  Your Rating
                </H5>
                <H5 color='error.main'>*</H5>
              </FlexBox>
              <Rating
                color='warn'
                size='medium'
                value={values.star || 0}
                onChange={(_, value) => setFieldValue('star', value)}
              />
            </Box>

            <Box mb={3}>
              <FlexBox mb={1.5}>
                <H5 color='grey.700' mr={0.75}>
                  Your Review
                </H5>
                <H5 color='error.main'>*</H5>
              </FlexBox>

              <TextField
                name='content'
                placeholder='Write a review here...'
                variant='outlined'
                multiline
                fullWidth
                rows={8}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.content || ''}
                error={!!touched.content && !!errors.content}
                helperText={touched.content && errors.content}
              />
            </Box>

            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={!(dirty && isValid)}
            >
              Submit
            </Button>
          </form>
        </> : null
      }

    </Box>
  )
}

const initialValues = {
  star: 0,
  content: '',
}

const reviewSchema = yup.object().shape({
  star: yup.number().required('required'),
  content: yup.string().required('required'),
})

export default ProductReview
