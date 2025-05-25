'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllServices } from '@/utils/api-requests'

export const useFindAllServices = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: () => getAllServices(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}
