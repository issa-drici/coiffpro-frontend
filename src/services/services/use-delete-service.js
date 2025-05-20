'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteService } from './api-requests'

export const useDeleteService = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteService,
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries(['services'])
            await onSuccess?.(data, variables, context)
        },
    })
}
