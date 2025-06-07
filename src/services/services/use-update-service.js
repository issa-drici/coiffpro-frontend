'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateService } from '@/utils/api-requests'

export const useUpdateService = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ serviceId, updates }) => updateService({ id: serviceId, ...updates }),
        onSuccess: (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
    })
}
