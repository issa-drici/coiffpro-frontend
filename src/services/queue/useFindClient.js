'use client'

import { getQueue } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export function useFindClient(clientId) {
    const {
        data: clientData,
        isLoading,
        isFetching,
        error,
    } = useQuery({
        queryKey: ['queue', 'client', clientId],
        queryFn: async () => {
            const { data } = await getQueue()
            const client = data.find(c => String(c.id) === String(clientId))
            return client || null
        },
        enabled: !!clientId,
        refetchInterval: 10000, // Rafraîchir toutes les 10 secondes
        staleTime: 5000, // Considérer les données comme périmées après 5 secondes
    })

    return {
        data: clientData?.data,
        isLoading,
        isFetching,
        error,
    }
}
