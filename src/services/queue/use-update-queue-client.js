'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateQueueClient } from '@/utils/api-requests'

export const useUpdateQueueClient = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ clientId, updates }) =>
            updateQueueClient({ id: clientId, ...updates }),
        onSuccess: (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
            const [{ clientId }] = args
            queryClient.invalidateQueries({ queryKey: ['queue'] })
            queryClient.invalidateQueries({
                queryKey: ['queue', 'client', clientId],
            })
        },
    })
}
