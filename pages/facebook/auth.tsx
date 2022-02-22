import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { instance } from '../../src/api/api'
import { toast } from 'react-toastify'

export default function Login() {

  const router = useRouter()
  const { query } = router
  const { code } = query

  const loginFacebookHandler = async (code : any) => {
    try {
      await instance.post('/facebook/auth', {
        code,
      })
      router.push('/')
    } catch (err) {
      toast.error(err.response.data.message)
      console.log({ err })
      router.push('/')
    }

  }

  useEffect(() => {
    if (!code) {
      console.log('NOT have code')
      return
    }
    console.log('have code')
    loginFacebookHandler(code)
  }, [code])
  return (
    <div>
    </div>
  )
}
