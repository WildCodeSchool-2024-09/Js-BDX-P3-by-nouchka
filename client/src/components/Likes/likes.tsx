import { useState } from "react";
import "./style.css";
import "../Product/style.css";

interface LikesButtonProps {
  className?: string;
}
export default function LikesButton({ className }: LikesButtonProps) {
  const [likes, setLikes] = useState(false);
    const ariaLabel = likes ? "Ajouter un like" : "supprimer un likes";
  return (
    <button
      type="button"
      className={`likesButton ${className}`}
      onClick={() => setLikes(!likes)}
      aria-label={ariaLabel}
    >
      {likes ? "🩷" : "🖤"}
    </button>
  );
}
