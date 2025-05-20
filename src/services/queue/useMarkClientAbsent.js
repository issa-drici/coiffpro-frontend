'use client'

import { toast } from 'sonner'
import { markClientAbsent } from '@/utils/api-requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mockMutation, mockQueueData } from './mock-data'

const isDev = true
// const isDev = process.env.NODE_ENV === 'development'

export const useMarkClientAbsent = ({ handleCallbackSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: clientId => {
            if (isDev) {
                // Simuler la mise à jour du statut du client
                const updatedClient = mockQueueData.find(c => c.id === clientId)
                if (updatedClient) {
                    updatedClient.status = 'absent'
                }
                return mockMutation(updatedClient)
            }
            return markClientAbsent(clientId)
        },
        onSuccess: async (response, variables) => {
            if (handleCallbackSuccess !== undefined) {
                handleCallbackSuccess(response, variables)
            }
            toast.success('Client marqué comme absent', {
                description: 'Le client a été marqué comme absent.',
            })
            await queryClient.invalidateQueries(['queue'])
            return true
        },
        onError: async error => {
            toast.error('Une erreur est survenue', {
                description:
                    error?.response?.data?.message ||
                    'Erreur lors du marquage du client comme absent.',
            })
            return false
        },
    })
}
