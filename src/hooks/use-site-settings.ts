import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

export const useSiteSettings = () => {
    return useQuery({
        queryKey: ['site-settings'],
        queryFn: async () => {
            const response = await apiClient.get('/settings');
            return response.data;
        },
        staleTime: 1000 * 60 * 60, // 1 hour
    });
};
