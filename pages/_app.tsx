import '../public/global.css'
import { AppProvider } from '@context/app/AppContext'
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

import 'react-toastify/dist/ReactToastify.css'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'

import { useDispatch, useSelector } from 'react-redux'
// @ts-ignore
import { wrapper } from '../src/redux/store'


import cookie from 'cookie'

import { instance } from '../src/api/api'
import { ToastContainer } from 'react-toastify'
import { CHAT_WITH_SHOP, CHAT_WITH_USER, INIT_CART, INIT_SOCKET_CLIENT, TOGGLE_SHOW_CHAT } from '../src/redux/constants'
import BazarButton from '@component/BazarButton'
import UserChat from '@component/chat/user_chat'
import { ChatType } from '../src/constants/chat'
import { createSocketClient } from '../src/socket/socket-client'
import { toggleLoginPopup } from '../src/redux/actions'

export const cache = createCache({ key: 'css', prepend: true })


//Binding events.
Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

nProgress.configure({ showSpinner: false })

const App = ({ Component, pageProps }: any) => {
  const Layout = Component.layout || Fragment

  const dispatch = useDispatch()

  const { isShowChat } = useSelector(state => state.layoutReducer)
  const { isLogin } = useSelector(state => state.authReducer)

  const { user } = useSelector(state => state.authReducer)

  const { socketClient: socketClient } = useSelector(state => state.chatReducer)

  useEffect(() => {
    // connect socket
    const socket = createSocketClient()

    dispatch({
      type: INIT_SOCKET_CLIENT,
      socketClient: socket,
    })

    // TODO : declare listen global event
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  // const getCart = () => {
  //   dispatch({
  //     type: 'INIT_CART_SAGA',
  //   })
  // }
  //
  // useEffect(() => {
  //   getCart()
  // }, [])

  useEffect(() => {
    console.log('use effect socketClient', socketClient)
    if (socketClient) {
      socketClient.on('CHAT_WITH_SHOP', data => {
        console.log('receive CHAT_WITH_SHOP event', data)
        dispatch({
          type: CHAT_WITH_SHOP,
          data,
        })
      })

      socketClient.on('CHAT_WITH_USER', data => {
        console.log('receive CHAT_WITH_USER event', data)
        dispatch({
          type: CHAT_WITH_USER,
          data,
        })
      })
    }
  }, [socketClient])


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
            <ToastContainer />
            <Component {...pageProps} />
            {
              (!isShowChat) ? <BazarButton
                variant='contained'
                color='primary'
                style={{ position: 'fixed', bottom: '10px', right: '10px' }}
                sx={{
                  mb: '36px',
                  px: '1.75rem',
                  height: '40px',
                }}
                onClick={isLogin ? () => dispatch({ type: TOGGLE_SHOW_CHAT }) : () => dispatch(toggleLoginPopup())}
              >
                Messages
              </BazarButton> : null
            }
            {
              isShowChat ? <div style={{ position: 'fixed', bottom: '0px', right: '20px', zIndex: 1000 }}>
                <UserChat chatType={ChatType.USER} height={'500px'} />
              </div> : null
            }

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
App.getInitialProps = wrapper.getInitialAppProps(store => async (appContext: any): Promise<any> => {

  console.log('[app.js] get initial props ')
  const { router, Component, ctx } = appContext
  const { req, res } = ctx

  // TODO : check is server side or not,
  // TODO : if server side, set cookie, otherwise , not need set cookie
  // check route permission
  let userInfo: unknown = {}

  if (typeof window === 'undefined') {
    const { headers } = req
    const cookies = cookie.parse(headers.cookie || '')
    console.log({ cookies })
    console.log('real cookie ', headers.cookie)

    const cookieHeader = headers.cookie

    // SERVER SIDE
    try {
      const response = await instance.get('/me', {
        headers: headers.cookie ? {
          Cookie: headers.cookie,
        } : {},
      })

      const cartResponse = await instance.get('/cart-items', {
        headers: headers.cookie ? {
          Cookie: headers.cookie,
        } : {},
      })

      store.dispatch({
        type: INIT_CART,
        cartList: cartResponse.data.rows,
      })

      console.log({ response })
      userInfo = response.data
      store.dispatch({
        type: 'INIT_USER',
        user: userInfo,
      })

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

      const cartResponse = await instance.get('/cart-items')

      store.dispatch({
        type: 'INIT_USER',
        user: userInfo,
      })

      store.dispatch({
        type: INIT_CART,
        cartList: cartResponse.data.rows,
      })

    } catch (err) {
      console.log({ err })
      // Router.replace('/login')
    }
    // appContext.ctx.store.dispatch({
    //   type: 'HELLO',
    // })
    // appContext.ctx.store.dispatch(END)
    // await appContext.ctx.store.sagaTask.toPromise()
  }

  const pageProps = {}
  console.log({ pageProps })
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
})

// export async function getServerSideProps(context) {
//   console.log({ context })
//   console.log('get server side props in app')
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// })


export default wrapper.withRedux(App)
