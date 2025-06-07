'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteService } from '@/utils/api-requests'

export const useDeleteService = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (serviceId) => deleteService(serviceId),
        onSuccess: (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
    })
}
