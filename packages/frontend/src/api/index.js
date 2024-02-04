import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const instance = axios.create({
    baseURL: BASE_URL,
})

export const api = {
    get: (url, params) => instance.get(url, { params}),
    post: (url, data) => instance.post(url, data),
    put: (url, data) => instance.put(url, data),
    delete: (url) => instance.delete(url),
}