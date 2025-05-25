'use client'

import { useQuery } from '@tanstack/react-query'
import { mockClientData, mockResponse } from './mock-data'

export const useFindQueueClient = (clientId) => {
    return useQuery({
        queryKey: ['queue', 'client', clientId],
        queryFn: async () => {
            // TODO: Remplacer par l'appel API réel quand disponible
            // return getQueueClient(clientId)
            const client = mockClientData(clientId)
            if (!client) {
                throw new Error('Client non trouvé')
            }
            return mockResponse(client)
        },
        enabled: !!clientId,
        staleTime: 30 * 1000, // 30 secondes
    })
}
