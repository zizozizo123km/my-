class ApiError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
        // Ensure the prototype chain is correctly set up
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}

/**
 * Utility function to retrieve the authentication token.
 * In a real application, this would check localStorage, sessionStorage, or a state management store.
 * @returns {string | null} The JWT token or null.
 */
const getAuthToken = () => {
    // Placeholder for actual token retrieval logic
    return localStorage.getItem('authToken');
};

class ApiClient {
    constructor(baseURL) {
        if (!baseURL) {
            throw new Error("API Client requires a base URL.");
        }
        this.baseURL = baseURL;
    }

    /**
     * Internal request handler
     * @param {string} method HTTP method (GET, POST, etc.)
     * @param {string} endpoint API path (e.g., '/products')
     * @param {object | null} data Request body data for POST/PUT
     * @param {object} customHeaders Additional headers
     * @returns {Promise<object | null>} The parsed JSON response data
     */
    async _request(method, endpoint, data = null, customHeaders = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = getAuthToken();

        const headers = {
            'Content-Type': 'application/json',
            ...customHeaders,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            method,
            headers,
        };

        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, config);

            // Check if the response has content before trying to parse JSON
            const contentType = response.headers.get('content-type');
            const isJson = contentType && contentType.includes('application/json');

            let responseData = null;

            if (response.status !== 204) { // 204 No Content
                if (isJson) {
                    responseData = await response.json();
                } else {
                    // Handle non-JSON responses (e.g., plain text errors)
                    responseData = await response.text();
                }
            }

            if (!response.ok) {
                const errorMessage = responseData?.message || responseData || `Request failed with status ${response.status}`;
                throw new ApiError(errorMessage, response.status, responseData);
            }

            return responseData;

        } catch (error) {
            // Re-throw structured API errors or wrap network errors
            if (error instanceof ApiError) {
                throw error;
            }
            // Handle network errors (e.g., DNS failure, CORS issues)
            console.error('Network or unexpected error:', error);
            throw new ApiError(`Network Error: ${error.message}`, 0, null);
        }
    }

    /**
     * Performs a GET request.
     * @param {string} endpoint
     * @param {object} params Query parameters (optional)
     */
    get(endpoint, params = {}) {
        let fullEndpoint = endpoint;
        const query = new URLSearchParams(params).toString();
        if (query) {
            fullEndpoint = `${endpoint}?${query}`;
        }
        return this._request('GET', fullEndpoint);
    }

    /**
     * Performs a POST request.
     * @param {string} endpoint
     * @param {object} data Request body
     */
    post(endpoint, data) {
        return this._request('POST', endpoint, data);
    }

    /**
     * Performs a PUT request.
     * @param {string} endpoint
     * @param {object} data Request body
     */
    put(endpoint, data) {
        return this._request('PUT', endpoint, data);
    }

    /**
     * Performs a DELETE request.
     * @param {string} endpoint
     */
    delete(endpoint) {
        return this._request('DELETE', endpoint);
    }

    /**
     * Performs a PATCH request.
     * @param {string} endpoint
     * @param {object} data Request body
     */
    patch(endpoint, data) {
        return this._request('PATCH', endpoint, data);
    }
}

// --- Singleton Export ---

// Use environment variable for the API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * The singleton instance of the ApiClient.
 * Use this instance throughout the application.
 */
const apiClient = new ApiClient(API_BASE_URL);

export { apiClient, ApiError };