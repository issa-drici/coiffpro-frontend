'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createQueueClient } from '@/utils/api-requests'

export const useCreateQueueClient = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newClient) => createQueueClient(newClient),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['queue'] })
        },
    })
}
