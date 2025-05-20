'use client'

import { toast } from 'sonner'
import { takeClient } from '@/utils/api-requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mockMutation, mockQueueData } from './mock-data'

const isDev = true
// const isDev = process.env.NODE_ENV === 'development'

export const useTakeClient = ({ handleCallbackSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: clientId => {
            if (isDev) {
                // Simuler la mise à jour du statut du client
                const updatedClient = mockQueueData.find(c => c.id === clientId)
                if (updatedClient) {
                    updatedClient.status = 'in_progress'
                }
                return mockMutation(updatedClient)
            }
            return takeClient(clientId)
        },
        onSuccess: async (response, variables) => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess(response, variables)
            }
            toast.success('Client pris en charge', {
                description: 'Le client a été pris en charge avec succès.',
            })
            await queryClient.invalidateQueries(['queue'])
            return true
        },
        onError: async error => {
            toast.error('Une erreur est survenue', {
                description:
                    error?.response?.data?.message ||
                    'Erreur lors de la prise en charge du client.',
            })
            return false
        },
    })
}
