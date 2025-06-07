'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createQueueClient } from '@/utils/api-requests'

export const useCreateQueueClient = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newClient) => createQueueClient(newClient),
        onSuccess: (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
            queryClient.invalidateQueries({ queryKey: ['queue'] })
        },
    })
}
