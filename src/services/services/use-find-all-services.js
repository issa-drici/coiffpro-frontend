'use client'

import { useQuery } from '@tanstack/react-query'
// import { getAllServices } from './api-requests'
import { mockServices } from './mock-data'

const MOCK_DELAY = 500 // Simuler un délai réseau

export const useFindAllServices = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            // Simuler un délai réseau
            await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
            return { data: mockServices }
        },
        // Désactiver temporairement la requête API réelle
        // queryFn: getAllServices,
    })
}
