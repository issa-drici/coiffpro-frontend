import { useQuery } from '@tanstack/react-query'

// Mock des données pour le développement
const mockServices = [
    { id: 1, name: 'Coupe homme', price: 20, duration: 20 },
    { id: 2, name: 'Coupe femme', price: 30, duration: 30 },
    { id: 3, name: 'Barbe', price: 10, duration: 15 },
    { id: 4, name: 'Brushing', price: 18, duration: 25 },
    { id: 5, name: 'Coloration', price: 40, duration: 45 },
    { id: 6, name: 'Mèches', price: 50, duration: 60 },
]

export function useGetServices() {
    return useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            // TODO: Remplacer par l'appel API réel
            // const response = await fetch('/api/services')
            // if (!response.ok) throw new Error('Erreur lors de la récupération des services')
            // return response.json()

            // Simulation d'un délai réseau
            await new Promise(resolve => setTimeout(resolve, 500))
            return mockServices
        },
    })
}
