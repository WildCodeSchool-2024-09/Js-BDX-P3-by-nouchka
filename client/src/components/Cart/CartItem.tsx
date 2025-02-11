import type { CartItem } from "../../types/cartItem";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartItemComponent = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  return (
    <article className="cartContainer">
      <h3 className="item">{item.name}</h3>
      <img
        src={`${import.meta.env.VITE_API_URL}/${item.URL}`}
        alt={item.name}
        className="img-cart"
      />
      <p className="item">{item.price} €</p>
      <article className="quantityButtons">
        <button
          className="reduceQuantity"
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="item">Quantité: {item.quantity}</span>
        <button
          className="addQuantity"
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </article>
      <button
        className="delete-item"
        type="button"
        onClick={() => onRemove(item.id)}
      >
        Supprimer
      </button>
    </article>
  );
};
