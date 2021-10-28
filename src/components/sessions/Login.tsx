import BazarButton from '@component/BazarButton'
import Image from '@component/BazarImage'
import BazarTextField from '@component/BazarTextField'
import FlexBox from '@component/FlexBox'
import { H3, H6, Small } from '@component/Typography'
import { Box, Card, CardProps, Divider, IconButton } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import * as yup from 'yup'
import { instance } from '../../api/api'
import { toast } from 'react-toastify'

const fbStyle = {
  background: '#3B5998',
  color: 'white',
}
const googleStyle = {
  background: '#4285F4',
  color: 'white',
}

type StyledCardProps = {
  passwordVisibility?: boolean
}

const StyledCard = styled<React.FC<StyledCardProps & CardProps>>(
  ({ children, passwordVisibility, ...rest }) => <Card {...rest}>{children}</Card>,
)<CardProps>(({ theme, passwordVisibility }) => ({
  width: 500,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },

  '.content': {
    textAlign: 'center',
    padding: '3rem 3.75rem 0px',
    [theme.breakpoints.down('xs')]: {
      padding: '1.5rem 1rem 0px',
    },
  },
  '.passwordEye': {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400],
  },
  '.facebookButton': {
    marginBottom: 10,
    '&:hover': fbStyle,
    ...fbStyle,
  },
  '.googleButton': {
    '&:hover': googleStyle,
    ...googleStyle,
  },
  '.agreement': {
    marginTop: 12,
    marginBottom: 24,
  },
}))

const Login = ({ toggleDialog }: any) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const router = useRouter()

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible)
  }, [])

  const handleFormSubmit = async (values: any) => {
    try {
      await instance.post('/login/local', values)
      if (router.pathname === '/') {
        toggleDialog()
      }
      router.push('/')
    } catch (err) {
      toast.error('Error')
    }

  }

  const handleGoogleLogin = async () => {
    const res = await instance.get('/google-login-url')
    console.log({ res })
    router.push(res.data.url)
  }

  const handleFacebookLogin = async () => {
    const res = await instance.get('/facebook-login-url')
    console.log({ res })
    router.push(res.data.url)
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    })

  return (
    <StyledCard elevation={3} passwordVisibility={passwordVisibility}>
      <form className='content' onSubmit={handleSubmit}>
        <H3 textAlign='center' mb={1}>
          Welcome To Ecommerce
        </H3>
        <Small
          fontWeight='600'
          fontSize='12px'
          color='grey.800'
          textAlign='center'
          mb={4.5}
          display='block'
        >
          Log in with email & password
        </Small>

        <BazarTextField
          mb={1.5}
          name='loginId'
          label='Email'
          placeholder='exmple@mail.com'
          variant='outlined'
          size='small'
          type='email'
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.loginId || ''}
          error={!!touched.loginId && !!errors.loginId}
          helperText={touched.loginId && errors.loginId}
        />

        <BazarTextField
          mb={2}
          name='password'
          label='Password'
          placeholder='*********'
          autoComplete='on'
          type={passwordVisibility ? 'text' : 'password'}
          variant='outlined'
          size='small'
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                size='small'
                type='button'
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? (
                  <Visibility className='passwordEye' fontSize='small' />
                ) : (
                  <VisibilityOff className='passwordEye' fontSize='small' />
                )}
              </IconButton>
            ),
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ''}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />

        <BazarButton
          variant='contained'
          color='primary'
          type='submit'
          fullWidth
          sx={{
            mb: '1.65rem',
            height: 44,
          }}
        >
          Login
        </BazarButton>

        <Box mb={2}>
          <Box width='200px' mx='auto'>
            <Divider />
          </Box>

          <FlexBox justifyContent='center' mt={-1.625}>
            <Box color='grey.600' bgcolor='background.paper' px={2}>
              on
            </Box>
          </FlexBox>
        </Box>

        <BazarButton
          className='facebookButton'
          size='medium'
          fullWidth
          sx={{
            mb: '10px',
            height: 44,
          }}
          onClick={handleFacebookLogin}
        >
          <Image
            src='/assets/images/icons/facebook-filled-white.svg'
            alt='facebook'
          />
          <Box fontSize='12px' ml={1}>
            Continue with Facebook
          </Box>
        </BazarButton>
        <BazarButton
          className='googleButton'
          size='medium'
          fullWidth
          sx={{
            height: 44,
          }}
          onClick={handleGoogleLogin}
        >
          <Image src='/assets/images/icons/google-1.svg' alt='facebook' />
          <Box fontSize='12px' ml={1}>
            Continue with Google
          </Box>
        </BazarButton>

        <FlexBox justifyContent='center' alignItems='center' my='1.25rem'>
          <Box>Don’t have account?</Box>
          <Link href='/signup'>
            <a>
              <H6 ml={1} borderBottom='1px solid' borderColor='grey.900'>
                Sign Up
              </H6>
            </a>
          </Link>
        </FlexBox>
      </form>

      <FlexBox justifyContent='center' bgcolor='grey.200' py={2.5}>
        Forgot your password?
        <Link href='/'>
          <a>
            <H6 ml={1} borderBottom='1px solid' borderColor='grey.900'>
              Reset It
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledCard>
  )
}

const initialValues = {
  loginId: '',
  password: '',
}

const formSchema = yup.object().shape({
  loginId: yup.string().email('invalid email').required('${path} is required'),
  password: yup.string().required('${path} is required'),
})

export default Login
