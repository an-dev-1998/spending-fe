import axios from 'axios';

/**
 * Fetches the CSRF token from Laravel Sanctum
 * This should be called before making any authenticated requests
 */
export const fetchSanctumCsrfToken = async (): Promise<void> => {
  try {
    const baseURL =
      import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://127.0.0.1:8000';
    await axios.get(`${baseURL}/sanctum/csrf-cookie`, {
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    throw error;
  }
};

/**
 * Initializes authentication by fetching the CSRF token
 * This should be called when the application starts
 */
export const initializeAuth = async (): Promise<void> => {
  try {
    await fetchSanctumCsrfToken();
  } catch (error) {
    console.error('Failed to initialize authentication:', error);
  }
};
