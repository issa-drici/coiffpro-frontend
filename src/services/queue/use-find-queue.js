"use client";

import { useQuery } from "@tanstack/react-query";
import { getQueue } from "@/utils/api-requests";

export const useFindQueue = () => {
    return useQuery({
        queryKey: ["queue"],
        queryFn: () => getQueue(),
        refetchInterval: 10000, // Rafraîchir toutes les 10 secondes
        staleTime: 5000, // Considérer les données comme périmées après 5 secondes
    });
};
