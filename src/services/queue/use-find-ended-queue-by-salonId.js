'use client'

import { getEndedQueueBySalonId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindEndedQueueBySalonId = salonId => {
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['ended-queue', salonId],
        queryFn: () => getEndedQueueBySalonId(salonId),
        refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
        staleTime: 15000, // Considérer les données comme périmées après 15 secondes
        enabled: !!salonId,
        refetchOnWindowFocus: true,
    })

    return {
        data: data?.data,
        isLoading,
        isFetching,
        error,
    }
}
