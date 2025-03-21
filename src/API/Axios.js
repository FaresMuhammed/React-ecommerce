// TO SUMMARIZE CODE

import axios from 'axios'
import { URL } from './Api'
import Cookie from 'cookie-universal'

const cookie = Cookie()
const token = cookie.get('ecommerce')

export const Axios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
})