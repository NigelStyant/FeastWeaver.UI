import { useState, useEffect } from "react";

import { useApiWithWeaver } from "@/hooks/useApiWithWeaver";
import type { Diner } from "@/types";

export function useGetDiners() {
  const [diners, setDiners] = useState<Diner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const { get } = useApiWithWeaver();

  useEffect(() => {
    async function fetchDiners() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await get<Diner[]>("diners");

        if (data && data.length > 0) {
          setDiners(data);
        } else {
          // If we get an empty array or null response but no error, it's a new user
          setIsNewUser(true);
          setDiners([]);
        }
      } catch (err) {
        console.error("Error fetching diners:", err);

        // Check if this is a new user (404 Not Found or empty data)
        if (err instanceof Error) {
          const errorMessage = err.message.toLowerCase();
          if (
            errorMessage.includes("not found") ||
            errorMessage.includes("404") ||
            errorMessage.includes("no data")
          ) {
            setIsNewUser(true);
            setDiners([]);
            setError(null); // Clear error for new users
          } else {
            const errorMsg =
              err instanceof Error ? err.message : "Failed to fetch diners";
            setError(errorMsg);
          }
        } else {
          setError("Failed to fetch diners");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchDiners();
  }, [get]);

  return { diners, isLoading, error, isNewUser };
}
