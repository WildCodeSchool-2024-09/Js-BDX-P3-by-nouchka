import "../Shop/index.css";

type JewelryItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

const jewelryItems: JewelryItem[] = [
  {
    id: 1,
    name: "Saint-Etienne",
    price: 19.99,
    imageUrl: "/api/placeholder/200/200",
  },
  {
    id: 2,
    name: "Ouarzazate",
    price: 19.99,
    imageUrl: "/api/placeholder/200/200",
  },
  {
    id: 3,
    name: "Castellbajac",
    price: 14.99,
    imageUrl: "${process.env.PUBLIC_URL}/assets/images/IMG_3262.png",
  },
  {
    id: 4,
    name: "Kyoto",
    price: 19.99,
    imageUrl: "clientsrcassetsimagesIMG_3262.png",
  },
  {
    id: 5,
    name: "Mbappe",
    price: 19.99,
    imageUrl: "serverpublicassetsimages\bergen.jpg",
  },
  {
    id: 6,
    name: "Oppaiiiiiii",
    price: 19.99,
    imageUrl: "/api/placeholder/200/200",
  },
];

export default function Shop() {
  return (
    <section className="shop-container">
      <h2>Shop by.Nouchka</h2>

      <ul className="products-grid">
        {jewelryItems.map((item) => (
          <li key={item.id} className="product-card">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="product-image"
            />
            <h3>{item.name}</h3>
            <p className="price">{item.price.toFixed(2)} €</p>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="add-to-cart">Ajouter au panier</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
