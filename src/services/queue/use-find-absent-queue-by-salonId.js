'use client'

import { getAbsentQueueBySalonId } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export const useFindAbsentQueueBySalonId = salonId => {
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['absent-queue', salonId],
        queryFn: () => getAbsentQueueBySalonId(salonId),
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
