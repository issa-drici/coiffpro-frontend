'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteService } from '@/utils/api-requests'

export const useDeleteService = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (serviceId) => deleteService(serviceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
    })
}
