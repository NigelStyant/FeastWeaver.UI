/**
 * Creates a properly formatted API URL with weaver ID
 */
export function createApiUrl(endpoint: string, weaverId?: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7178";
  const path = endpoint.startsWith("/") ? endpoint.substring(1) : endpoint;

  if (weaverId) {
    return `${baseUrl}/${weaverId}/${path}`;
  }

  return `${baseUrl}/${path}`;
}

/**
 * Debug-enabled fetch function that logs request and response details
 */
export async function debugFetch(
  url: string,
  options: RequestInit
): Promise<Response> {
  console.log(`🌐 Fetching: ${url}`);
  console.log("📦 Options:", options);

  try {
    const response = await fetch(url, options);
    console.log(
      `✅ Response status: ${response.status} ${response.statusText}`
    );
    return response;
  } catch (error) {
    console.error("❌ Fetch error:", error);
    throw error;
  }
}
