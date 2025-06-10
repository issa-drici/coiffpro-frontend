'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateService } from '@/utils/api-requests'

export const useUpdateService = ({ salonId, onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ serviceId, updates }) =>
            updateService({ id: serviceId, ...updates }),
        onSuccess: async (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
            await queryClient.invalidateQueries({
                queryKey: ['salon', salonId, 'services'],
                exact: true,
            })
        },
    })
}
