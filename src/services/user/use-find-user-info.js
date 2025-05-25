'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/utils/api-requests'

export const useFindUserInfo = () => {
    return useQuery({
        queryKey: ['user', 'info'],
        queryFn: () => getUserInfo(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}
