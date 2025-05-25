'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateQueueClient } from '@/utils/api-requests'

export const useUpdateQueueClient = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ clientId, updates }) => updateQueueClient({ id: clientId, ...updates }),
        onSuccess: (_, { clientId }) => {
            queryClient.invalidateQueries({ queryKey: ['queue'] })
            queryClient.invalidateQueries({ queryKey: ['queue', 'client', clientId] })
        },
    })
}
