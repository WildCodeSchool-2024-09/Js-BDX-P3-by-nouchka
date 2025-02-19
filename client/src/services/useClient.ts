import { useEffect, useState } from "react";
import type { Clients } from "../types/clientsData";

interface UseClientsReturn {
  clients: Clients[];
  loading: boolean;
  error: string | null;
}

export const useClients = (): UseClientsReturn => {
  const [clients, setClients] = useState<Clients[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Pas d'authentification");
        setLoading(false);
        return;
      }

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/clients`,
          {
            method: "GET",
            headers,
          },
        );

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Error while loading data: ${errorDetails}`);
        }

        const data = await response.json();
        setClients(data);
      } catch (error) {
        setError("Error loading clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, loading, error };
};
