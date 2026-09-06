import axios from 'axios'
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
    (response: AxiosResponse): any => {
        const result = response.data
        if(!result.success) {
            return Promise.reject(new Error(result.message))
        }
        return result
    },
    async (error: AxiosError<{ message:string }>) => {
        if (error.response?.data?.message){
            return Promise.reject(new Error(error.response?.data?.message))
        }
        
        return Promise.reject(error)
    }
)

export default api

