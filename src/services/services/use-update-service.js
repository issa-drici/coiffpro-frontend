'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateService } from './api-requests'

export const useUpdateService = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateService,
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries(['services'])
            await onSuccess?.(data, variables, context)
        },
    })
}
