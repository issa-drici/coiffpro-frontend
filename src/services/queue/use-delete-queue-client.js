'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteQueueClient } from '@/utils/api-requests'

export const useDeleteQueueClient = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: clientId => deleteQueueClient(clientId),
        onSuccess: (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
            const [clientId] = args
            queryClient.invalidateQueries({ queryKey: ['queue'] })
            queryClient.invalidateQueries({
                queryKey: ['queue', 'client', clientId],
            })
        },
    })
}
