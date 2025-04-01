import { useState, useCallback } from "react";
import { DEFAULT_WEAVER_ID } from "@/config";
import { createFetchOptions } from "@/utils/api";
import { debugFetch, createApiUrl } from "@/utils/api-debug";

// TEMPORARY DEBUG FLAG
const DEBUG_API = true;

/**
 * Custom hook for making API requests that require a weaverId parameter
 * Handles loading state, error handling, and proper URL construction
 */
export function useApiWithWeaver() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Makes an API request with weaverId in the path
   * @param endpoint - API endpoint without leading slash
   * @param options - Fetch options
   * @returns Promise with the fetch response
   */
  const apiRequest = useCallback(
    async <T>(
      endpoint: string,
      options: RequestInit = {}
    ): Promise<T | null> => {
      // Debug logging
      if (DEBUG_API) {
        console.log(`🔍 API request to endpoint: ${endpoint}`);
        console.log(
          `🔑 Current weaverId: ${DEFAULT_WEAVER_ID || "not available"}`
        );
      }

      setIsLoading(true);
      setError(null);

      try {
        const url = createApiUrl(endpoint, DEFAULT_WEAVER_ID);

        const defaultOptions: RequestInit = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        console.log("🚀 Default options:", defaultOptions);
        console.log("🚀 Provided options:", options);

        // Merge default options with provided options
        const fetchOptions = createFetchOptions({
          ...defaultOptions,
          ...options,
        });

        // Make the API call with debug logging
        const response = await debugFetch(url, fetchOptions);

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        return data as T;
      } catch (err) {
        console.error(`API error for ${endpoint}:`, err);
        setError(err instanceof Error ? err.message : String(err));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Makes a GET request to the API with weaverId in the path
   * @param endpoint - API endpoint without leading slash
   * @returns Promise with the parsed JSON response
   */
  const get = useCallback(
    async <T>(endpoint: string): Promise<T | null> => {
      return apiRequest<T>(endpoint, { method: "GET" });
    },
    [apiRequest]
  );

  /**
   * Makes a POST request to the API with weaverId in the path
   * @param endpoint - API endpoint without leading slash
   * @param data - Data to send in the request body
   * @returns Promise with the parsed JSON response
   */
  const post = useCallback(
    async <T, D extends Record<string, unknown>>(
      endpoint: string,
      data: D
    ): Promise<T | null> => {
      return apiRequest<T>(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    [apiRequest]
  );

  /**
   * Makes a DELETE request to the API with weaverId in the path
   * @param endpoint - API endpoint without leading slash
   * @returns Promise with success status
   */
  const remove = useCallback(
    async (endpoint: string): Promise<boolean> => {
      try {
        const result = await apiRequest<unknown>(endpoint, {
          method: "DELETE",
        });
        return result !== null;
      } catch {
        return false;
      }
    },
    [apiRequest]
  );

  return {
    get,
    post,
    remove,
    apiRequest,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
