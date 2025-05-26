import { createQueueClient } from '@/utils/api-requests'
import { useMutation } from '@tanstack/react-query'

export const useRegisterClient = ({ handleCallbackSuccess }) => {
    // const { toast } = useToast() // tu peux le remettre si tu veux les toasts

    return useMutation({
        mutationFn: data => createQueueClient(data),
        onSuccess: async response => {
            if (handleCallbackSuccess && response?.data?.id) {
                handleCallbackSuccess(response.data.id)
            }
            // toast({ ... })
            return true
        },
        onError: async () => {
            // toast({ ... })
            return false
        },
    })
}
