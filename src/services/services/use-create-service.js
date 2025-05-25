'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createService } from '@/utils/api-requests'

export const useCreateService = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newService) => createService(newService),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
    })
}
