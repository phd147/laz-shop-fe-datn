import { io } from 'socket.io-client'

const createSocketClient = () => {
  return io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    withCredentials: true,
    // extraHeaders: {
    //   Cookie: cookies,
    // },
  })
}


export { createSocketClient }
