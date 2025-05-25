'use client'

import { useQuery } from '@tanstack/react-query'
import { getVisitorStats } from '@/utils/api-requests'

export const useFindVisitorStats = ({ startDate, endDate }) => {
    return useQuery({
        queryKey: ['stats', 'visitors', startDate, endDate],
        queryFn: () => getVisitorStats({ startDate, endDate }),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}
