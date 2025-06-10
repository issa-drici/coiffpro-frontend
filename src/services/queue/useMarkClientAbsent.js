'use client'

import { toast } from 'sonner'
import { markClientAbsent } from '@/utils/api-requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useMarkClientAbsent = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: clientId => markClientAbsent(clientId),
        onSuccess: async (...args) => {
            if (onSuccess) {
                onSuccess(...args)
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
