import axios from 'axios'
import { BASE_URL } from './env.js' // adjust the path as necessary

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const api = {
    get: (url, params) => instance.get(url, { params }),
    post: (url, data) => instance.post(url, data),
    put: (url, data) => instance.put(url, data),
    delete: (url) => instance.delete(url),
}