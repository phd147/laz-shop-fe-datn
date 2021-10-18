import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { instance } from '../../src/api/api'

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
      console.log({ err })
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
      Login Facebook.....
    </div>
  )
}
