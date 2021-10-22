import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { instance } from '../../src/api/api'

export default function Login() {

  const router = useRouter()
  const { query } = router
  const { code } = query

  const loginGoogleHandler = async (code : any) => {
    try {
      await instance.post('/google/auth', {
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
    loginGoogleHandler(code)
  }, [code])
  return (
    <div>
      Login Google.....
    </div>
  )
}
