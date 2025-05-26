'use client'

import { useQuery } from '@tanstack/react-query'
import { getEstimatedTime } from '@/utils/api-requests'

/**
 * Hook pour récupérer le temps estimé avant que tous les clients actuels soient servis
 * @param {string} salonId - ID du salon
 * @returns {Object} Résultat de la requête
 */
export function useGetEstimatedTime(salonId) {
    return useQuery({
        queryKey: ['salon', salonId, 'estimated-time'],
        queryFn: () => getEstimatedTime(salonId),
        enabled: !!salonId,
        staleTime: 1000 * 30, // 30 secondes
    })
}
