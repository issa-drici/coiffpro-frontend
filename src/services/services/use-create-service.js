'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createService } from './api-requests'

export const useCreateService = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createService,
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries(['services'])
            await onSuccess?.(data, variables, context)
        },
    })
}
