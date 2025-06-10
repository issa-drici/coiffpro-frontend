'use client'

import { useQuery } from '@tanstack/react-query'
import { getWaitingQueueBySalonId } from '@/utils/api-requests'

export const useFindWaitingQueueBySalonId = salonId => {
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['waiting-queue', salonId],
        queryFn: () => getWaitingQueueBySalonId(salonId),
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
