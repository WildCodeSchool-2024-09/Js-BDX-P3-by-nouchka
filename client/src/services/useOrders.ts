import { useEffect, useState } from "react";
import type { Clients } from "../types/clientsData";
import type { Jewelry } from "../types/jewelry";

interface Order {
  id: number;
  status: boolean;
  date: string;
  client: Clients;
  items: Jewelry[];
}

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export const useOrders = (): UseOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
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
          `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            method: "GET",
            headers,
          },
        );

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(
            `Erreur lors du chargement des commandes : ${errorDetails}`,
          );
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
        setError("Erreur lors du chargement des commandes");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};
