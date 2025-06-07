'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteService } from '@/utils/api-requests'

export const useDeleteService = ({ salonId, onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (serviceId) => deleteService(serviceId),
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
