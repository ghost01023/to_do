// useNeonAuth.js
import { useEffect, useState } from 'react';

export function useNeonAuth() {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isLoading: true,
        user: null
    });

    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const response = await fetch('/api/auth/status');
                if (response.ok) {
                    const data = await response.json();
                    setAuthState({
                        isAuthenticated: data.isAuthenticated,
                        isLoading: false,
                        user: data.user
                    });
                } else {
                    setAuthState({
                        isAuthenticated: false,
                        isLoading: false,
                        user: null
                    });
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setAuthState({
                    isAuthenticated: false,
                    isLoading: false,
                    user: null
                });
            }
        }

        checkAuthStatus();
    }, []);

    return authState;
}