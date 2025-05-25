'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateService } from '@/utils/api-requests'

export const useUpdateService = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ serviceId, updates }) => updateService({ id: serviceId, ...updates }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
    })
}
