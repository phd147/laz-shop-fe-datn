import { AppProvider, useAppContext } from '@context/app/AppContext'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import MuiTheme from '@theme/MuiTheme'
import GoogleAnalytics from '@utils/GoogleAnalytics'
import OpenGraphTags from '@utils/OpenGraphTags'
import Head from 'next/head'
import Router from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import React, { Fragment, useEffect } from 'react'


import cookie from 'cookie'
import 'bootstrap/dist/css/bootstrap.min.css'

import { instance } from '../src/api/api'

export const cache = createCache({ key: 'css', prepend: true })


//Binding events.
Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

nProgress.configure({ showSpinner: false })

const App = ({ Component, pageProps }: any) => {
  const Layout = Component.layout || Fragment

  const { dispatch } = useAppContext()


  useEffect(() => {
    const {userInfo} = pageProps ;
    if (userInfo) {
      console.log({userInfo})
      dispatch({
        type: 'INIT_USER_INFO',
        data: userInfo
      })
    }
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <CacheProvider value={cache}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <GoogleAnalytics />
        <OpenGraphTags />
      </Head>
      <AppProvider>
        <MuiTheme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MuiTheme>
      </AppProvider>
    </CacheProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
App.getInitialProps = async (appContext: any): Promise<any> => {

  console.log('[app.js] get initial props ')
  const { router, Component, ctx } = appContext
  const { req, res } = ctx

  // TODO : check is server side or not,
  // TODO : if server side, set cookie, otherwise , not need set cookie
  // check route permission
  let userInfo: unknown = {}



  if (typeof window === 'undefined') {
    const { headers } = req
    const cookies = cookie.parse(headers.cookie|| '')
    console.log({ cookies })
    console.log('real cookie ', headers.cookie)
    // SERVER SIDE
    try {
      const response = await instance.get('/me', {
        headers: headers.cookie ? {
          Cookie: headers.cookie,
        } : {},
      })
      console.log({ response })
      userInfo = response.data

    } catch (err) {
      console.log({ err })
      // if(req.url !== '/login'){
      //   res.writeHead(307, { Location: '/login' })
      //   res.end()
      // }
    }
  } else {
    // TODO : handle with client side
    try {
      const response = await instance.get('/me')
      console.log({ response })
      userInfo = response.data

    } catch (err) {
      console.log({ err })
      // Router.replace('/login')
    }
  }

  const pageProps = {
    userInfo,
  }
  console.log({ pageProps})
  return {
    pageProps,
  }


  // TODO : call api get profile
  // const userInfo = {
  //   name: 'phd',
  //   role: ['admin', 'user'],
  // }



  // TODO : check route authentication and authorization
  // @ts-ignore
  // if (!userInfo || userInfo.name !== 'phd') {
  //   Router.push('/login')
  //   // get route, get route permission, ....
  // }

  // TODO : routing

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  // const appProps = await App.getInitialProps(appContext)
}

// export async function getServerSideProps(context) {
//   console.log({ context })
//   console.log('get server side props in app')
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }


export default App
