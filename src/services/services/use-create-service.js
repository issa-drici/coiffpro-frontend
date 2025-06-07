'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createService } from '@/utils/api-requests'

export const useCreateService = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newService) => createService(newService),
        onSuccess: (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
    })
}
