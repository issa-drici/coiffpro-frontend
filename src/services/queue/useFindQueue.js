'use client'

import { useQuery } from '@tanstack/react-query'
import { getQueue } from '@/utils/api-requests'
import { mockQueueData, mockResponse } from './mock-data'

const isDev = true
// const isDev = process.env.NODE_ENV === 'development'

export const useFindQueue = () => {
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['queue'],
        queryFn: () => isDev ? mockResponse(mockQueueData) : getQueue(),
        refetchInterval: 10000, // Rafraîchir toutes les 10 secondes
        staleTime: 5000, // Considérer les données comme périmées après 5 secondes
    })

    return {
        data: data?.data,
        isLoading,
        isFetching,
        error,
    }
}
