'use client'

import { useQuery } from '@tanstack/react-query'
import { getQueue } from '@/utils/api-requests'
import { mockClientData, mockResponse } from './mock-data'

const isDev = true
// const isDev = process.env.NODE_ENV === 'development'

export function useFindClient(clientId) {
    console.log('useFindClient - clientId:', clientId, 'type:', typeof clientId)

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['queue', 'client', clientId],
        queryFn: async () => {
            if (isDev) {
                console.log('Dev mode - Searching for client with ID:', clientId)
                const client = mockClientData(clientId)
                console.log('Found client:', client)
                return mockResponse(client)
            }
            const { data } = await getQueue()
            console.log('Production mode - Queue data:', data)
            const client = data.find(c => {
                console.log('Comparing:', c.id, clientId, 'types:', typeof c.id, typeof clientId)
                return String(c.id) === String(clientId)
            })
            console.log('Found client:', client)
            return client ? {
                ...client,
                salonName: "Salon CoiffPro",
                salonAddress: "123 rue de la Coiffure, 75001 Paris",
                salonPhone: "01 23 45 67 89",
                estimatedWaitTime: Math.floor(Math.random() * 30) + 15,
                nextClientPosition: client.position + 1,
                totalClientsInQueue: data.filter(c => c.status === 'waiting').length,
            } : null
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
