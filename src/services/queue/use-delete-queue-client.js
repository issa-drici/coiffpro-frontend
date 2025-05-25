'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteQueueClient } from '@/utils/api-requests'

export const useDeleteQueueClient = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (clientId) => deleteQueueClient(clientId),
        onSuccess: (_, clientId) => {
            queryClient.invalidateQueries({ queryKey: ['queue'] })
            queryClient.invalidateQueries({ queryKey: ['queue', 'client', clientId] })
        },
    })
}
