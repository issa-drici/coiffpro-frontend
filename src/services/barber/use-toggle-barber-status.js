'use client'

import { toggleBarberStatus } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useToggleBarberStatus = ({ onSuccess } = {}) => {
    return useMutation({
        mutationFn: barberId => toggleBarberStatus(barberId),
        onSuccess: (...args) => {
            if (onSuccess) {
                onSuccess(...args)
            }
        },
    })
}
