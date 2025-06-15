'use client'

import { moveToNextQueueClientBySalonId } from '@/utils/api-requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useMoveToNextQueueClientBySalonId = ({
    salonId,
    onSuccess,
} = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => moveToNextQueueClientBySalonId(salonId),
        onSuccess: (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
            queryClient.invalidateQueries({
                queryKey: ['current-queue-client', salonId],
            })
            queryClient.invalidateQueries({
                queryKey: ['waiting-queue', salonId],
            })
            queryClient.invalidateQueries({
                queryKey: ['ended-queue', salonId],
            })
            queryClient.invalidateQueries({
                queryKey: ['absent-queue', salonId],
            })
        },
    })
}
