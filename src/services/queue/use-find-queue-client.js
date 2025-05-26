'use client'

import { useQuery } from '@tanstack/react-query'
import { getQueueClient } from '@/utils/api-requests'

export const useFindQueueClient = (clientId) => {
    return useQuery({
        queryKey: ['queue', 'client', clientId],
        queryFn: async () => {
            const { data } = await getQueueClient(clientId)
            return data
        },
        enabled: !!clientId,
        staleTime: 30 * 1000, // 30 secondes
    })
}
