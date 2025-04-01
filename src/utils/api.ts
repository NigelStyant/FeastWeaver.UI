/**
 * Creates fetch options with proper headers and credentials
 */
export function createFetchOptions(options: RequestInit = {}): RequestInit {
  return {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
    },
  };
}
