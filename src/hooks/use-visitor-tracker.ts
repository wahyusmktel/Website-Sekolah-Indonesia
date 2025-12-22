import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '@/lib/api-client';

export const useVisitorTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // Handle Session Tracking
        const trackSession = async () => {
            let sessionId = sessionStorage.getItem('v_session_id');
            const isNewSession = !sessionId;

            if (isNewSession) {
                // Use built-in crypto.randomUUID() or fallback to a timestamp-based ID
                sessionId = (window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                sessionStorage.setItem('v_session_id', sessionId);

                // Log Session Start (Opening the website)
                try {
                    await apiClient.post('/analytics/track', {
                        sessionId,
                        type: 'session_start',
                        path: location.pathname
                    });
                } catch (error) {
                    console.error('Failed to track session start');
                }
            } else {
                // Log Page View for subsequent navigations in the same session
                try {
                    await apiClient.post('/analytics/track', {
                        sessionId,
                        type: 'page_view',
                        path: location.pathname
                    });
                } catch (error) {
                    // Silently ignore
                }
            }
        };

        // Don't track admin routes to keep data clean
        if (!location.pathname.startsWith('/admin')) {
            trackSession();
        }
    }, [location.pathname]);
};
