import axios from 'axios'
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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

