'use client'

import { useQuery } from '@tanstack/react-query'
import { getQueue } from '@/utils/api-requests'
import { mockClientData, mockResponse } from './mock-data'

const isDev = true
// const isDev = process.env.NODE_ENV === 'development'

export function useFindClient(clientId) {
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['queue', 'client', clientId],
        queryFn: async () => {
            if (isDev) {
                const client = mockClientData(clientId)
                return mockResponse(client)
            }
            const { data } = await getQueue()
            const client = data.find(c => {
                return String(c.id) === String(clientId)
            })
            return client
                ? {
                      ...client,
                      salonName: 'Salon CoiffPro',
                      salonAddress: '123 rue de la Coiffure, 75001 Paris',
                      salonPhone: '01 23 45 67 89',
                      estimatedWaitTime: Math.floor(Math.random() * 30) + 15,
                      nextClientPosition: client.position + 1,
                      totalClientsInQueue: data.filter(
                          c => c.status === 'waiting',
                      ).length,
                  }
                : null
        },
        enabled: !!clientId,
        refetchInterval: 10000, // Rafraîchir toutes les 10 secondes
        staleTime: 5000, // Considérer les données comme périmées après 5 secondes
    })

    return {
        data: data?.data,
        isLoading,
        isFetching,
        error,
    }
}
