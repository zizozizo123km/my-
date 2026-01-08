import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * A robust custom hook for fetching data from an API endpoint.
 * Handles loading, error states, and automatic cleanup using AbortController.
 *
 * @param {string | null} url The API endpoint URL. If null, fetching is skipped.
 * @param {RequestInit} options Standard fetch options (headers, method, body, etc.).
 * @returns {{ data: T | null, loading: boolean, error: Error | null, refetch: () => void }}
 */
export const useFetchData = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetchIndex, setRefetchIndex] = useState(0);

    // Memoize options dependency string to ensure useEffect only runs when options truly change
    const optionsString = useMemo(() => JSON.stringify(options), [options]);

    const refetch = useCallback(() => {
        setRefetchIndex(prev => prev + 1);
    }, []);

    useEffect(() => {
        // Skip fetch if URL is not provided
        if (!url) {
            setLoading(false);
            setData(null);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, { ...options, signal });

                if (!response.ok) {
                    // Throw a specific error if the response status is not 2xx
                    throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText || 'Unknown Error'}`);
                }

                const result = await response.json();

                // Only update state if the component is still mounted (signal not aborted)
                if (!signal.aborted) {
                    setData(result);
                }

            } catch (err) {
                // Ignore AbortError caused by cleanup
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        // Cleanup function: abort the fetch request if the component unmounts or dependencies change
        return () => {
            controller.abort();
        };

    // Dependencies: url, stringified options (to detect changes in headers/method), and refetchIndex
    }, [url, optionsString, refetchIndex]);

    return { data, loading, error, refetch };
};

export default useFetchData;