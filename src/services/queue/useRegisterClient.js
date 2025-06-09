"use client";

import { createQueueClient } from "@/utils/api-requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegisterClient = ({ onSuccess } = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: data => createQueueClient(data),
        onSuccess: async (...args) => {
            if (onSuccess) {
                onSuccess(...args);
            }
            await queryClient.invalidateQueries(["queue"]);
            return true;
        },
        onError: async () => {
            return false;
        },
    });
};
