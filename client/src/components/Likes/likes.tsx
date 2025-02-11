import useLikes from "../Likes/likesLogic";
import "./style.css";
import "../Product/style.css";
import LikesButtonProps from "../../types/Likes";

export default function LikesButton({
  className,
  jewelryId,
}: LikesButtonProps) {
  if (typeof jewelryId !== "number" || isNaN(jewelryId)) {
    console.error("jewelryId invalide:", jewelryId);
    return null;
  }

  const { likes, isLoading, handleLikeClick } = useLikes(jewelryId);
  const ariaLabel = likes ? "Ajouter un like" : "supprimer un likes";

  return (
    <button
      type="button"
      className={`likesButton ${className || ""} ${isLoading ? "loading" : ""}`}
      onClick={handleLikeClick}
      aria-label={ariaLabel}
      disabled={isLoading}
    >
      {likes ? "🩷" : "🖤"}
    </button>
  );
}
