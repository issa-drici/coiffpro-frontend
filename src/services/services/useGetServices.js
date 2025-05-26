'use client'

import { useQuery } from '@tanstack/react-query'
import { getSalonServices } from '@/utils/api-requests'

export function useGetServices(salonId) {
    return useQuery({
        queryKey: ['salon', salonId, 'services'],
        queryFn: () => getSalonServices(salonId),
        enabled: !!salonId, // La requête ne s'exécute que si salonId est défini
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
