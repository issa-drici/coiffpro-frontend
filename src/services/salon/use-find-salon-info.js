"use client";

import { useQuery } from "@tanstack/react-query";
import { getSalonInfo } from "@/utils/api-requests";

export const useFindSalonInfo = (salonId) => {
    return useQuery({
        queryKey: ["salon", "info"],
        queryFn: () => getSalonInfo(salonId),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
