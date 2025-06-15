'use client'

import { getSalonServices } from '@/utils/api-requests'
import { useQuery } from '@tanstack/react-query'

export function useGetServices(salonId) {
    return useQuery({
        queryKey: ['salon', salonId, 'services'],
        queryFn: () => getSalonServices(salonId),
        enabled: !!salonId, // La requête ne s'exécute que si salonId est défini
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    })
}
