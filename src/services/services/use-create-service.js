'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createService } from '@/utils/api-requests'

export const useCreateService = ({ salonId, onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: newService => createService(newService),
        onSuccess: async (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
            await queryClient.invalidateQueries({
                queryKey: ['salon', salonId, 'services'],
                exact: true
            })
        },
    })
}
