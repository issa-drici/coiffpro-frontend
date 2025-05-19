import Axios from 'axios'
import { notFound } from 'next/navigation'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
})

// Intercepteur pour gérer les erreurs 404 globalement
axios.interceptors.response.use(
    response => response,
    error => {
        if (
            error.response?.status === 404 &&
            !error.config.url?.includes('/api/auth/')
        ) {
            notFound()
        }
        return Promise.reject(error)
    },
)

export default axios
