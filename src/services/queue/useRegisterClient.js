import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useRegisterClient() {
    const queryClient = useQueryClient()

    return useMutation({
        // mutationFn: async ({ salonId, clientData }) => {
        mutationFn: async ({ clientData }) => {
            // TODO: Remplacer par l'appel API réel
            // const response = await fetch(`/api/salon/${salonId}/register`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(clientData),
            // })
            // if (!response.ok) throw new Error('Erreur lors de l\'inscription')
            // return response.json()

            // Simulation d'un délai réseau et d'une réponse réussie
            await new Promise(resolve => setTimeout(resolve, 1000))
            return {
                id: Math.floor(Math.random() * 1000),
                position: Math.floor(Math.random() * 10) + 1,
                estimatedTime: new Date(Date.now() + 30 * 60000).toISOString(),
                ...clientData,
                status: 'waiting',
            }
        },
        onSuccess: () => {
            // Invalider le cache de la file d'attente pour forcer un rafraîchissement
            queryClient.invalidateQueries({ queryKey: ['queue'] })
        },
    })
}
