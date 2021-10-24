import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BLOCKCHAIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
})


export { instance }
