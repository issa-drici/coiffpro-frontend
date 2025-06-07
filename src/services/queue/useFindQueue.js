'use client'

import { useQuery } from '@tanstack/react-query'
import { getQueue } from '@/utils/api-requests'

export const useFindQueue = (salonId) => {
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['queue', salonId],
        queryFn: () => getQueue(salonId),
        refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
        staleTime: 15000, // Considérer les données comme périmées après 15 secondes
        enabled: !!salonId,
    })

    return {
        data: data?.data,
        isLoading,
        isFetching,
        error,
    }
}
