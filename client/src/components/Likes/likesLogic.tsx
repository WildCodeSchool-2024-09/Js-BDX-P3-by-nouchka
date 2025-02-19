import { useEffect, useState } from "react";
import { useAuth } from "../Login/login_persistance/persistance";

export default function useLikes(jewelryId: number) {
  const [likes, setLikes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLogged } = useAuth();

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!isLogged) return;
      const clientId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!clientId || !jewelryId || !token) {
        console.error("Données manquantes:", { clientId, jewelryId, token });
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/clients/${clientId}/jewelry/${jewelryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setLikes(!!data.isLiked);
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    checkLikeStatus();
  }, [isLogged, jewelryId]);

  const handleLikeClick = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const clientId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/${clientId}/jewelry/${jewelryId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId: Number(clientId),
            jewelryId: Number(jewelryId),
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setLikes(data.liked);
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return { likes, isLoading, handleLikeClick };
}
