import { useQuery } from '@tanstack/react-query'
import { mockServiceConfig } from './mock-data'

export function useFindServiceConfig() {
    return useQuery({
        queryKey: ['services', 'config'],
        queryFn: async () => {
            // TODO: Remplacer par l'appel API quand disponible
            // Simuler un délai réseau
            await new Promise(resolve => setTimeout(resolve, 500))
            return mockServiceConfig
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}
