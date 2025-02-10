import { useEffect, useState } from "react";
import { useAuth } from "../Login/login_persistance/persistance";

export default function useLikes(jewelryId: number) {
    const [likes, setLikes] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { isLogged } = useAuth();

    useEffect(() => {
        const checkLikeStatus = async () => {
            console.log('isLogged:', isLogged);
            console.log('jewelryId:', jewelryId);
            console.log('userId in localStorage:', localStorage.getItem("userId"));
            if (!isLogged) return;

            const clientId = localStorage.getItem("userId");
            if (!clientId || !jewelryId) {
                console.error('ClientId ou JewelryId manquant');
                return;
            }

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token manquant');
                    return;
                }

                const response = await fetch(`/api/clients/likes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setLikes(!!data.isLiked);
                } else {
                    console.error(`Erreur HTTP: ${response.status}`);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du statut like:', error);
            }
        };

        checkLikeStatus();
    }, [isLogged, jewelryId]);

    const handleLikeClick = async () => {
        const token = localStorage.getItem('token');
        const clientId = localStorage.getItem('userId');
    
        console.log('Token:', token);
        console.log('ClientId:', clientId);
    
        try {
            const response = await fetch(`/api/clients/:clientId/jewelry/:jewelryId/likes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    clientId: Number(clientId),
                    jewelryId: Number(jewelryId)
                })
            });
    
            console.log('Réponse complète:', response);
    
            if (response.ok) {
                const data = await response.json();
                setLikes(data.liked);
                console.log(data.message);
            } else {
                const errorText = await response.text();
                console.error(`Erreur HTTP: ${response.status}`, errorText);
            }
        } catch (error) {
            console.error('Erreur lors de la gestion du like:', error);
        }
    };

    return {
        likes,
        isLoading,
        handleLikeClick
    };
}