// import "../Shop/index.css";
// import { useEffect, useState } from "react";

// type JewelryItem = {
//   id: number;
//   name: string;
//   price: number;
//   imageUrl: string;
// };

// type AboutData = {
//   id: number;
//   title: string;
//   description: string;
//   image_url: string;
// };

// const jewelryItems: JewelryItem[] = [
//   {
//     id: 1,
//     name: "Saint-Etienne",
//     price: 19.99,
//     imageUrl: "/api/placeholder/200/200",
//   },
//   {
//     id: 2,
//     name: "Ouarzazate",
//     price: 19.99,
//     imageUrl: "/api/placeholder/200/200",
//   },
//   {
//     id: 3,
//     name: "Castellbajac",
//     price: 14.99,
//     imageUrl: "${process.env.PUBLIC_URL}/assets/images/IMG_3262.png",
//   },
//   {
//     id: 4,
//     name: "Kyoto",
//     price: 19.99,
//     imageUrl: "clientsrcassetsimagesIMG_3262.png",
//   },
//   {
//     id: 5,
//     name: "Mbappe",
//     price: 19.99,
//     imageUrl: "serverpublicassetsimages\bergen.jpg",
//   },
//   {
//     id: 6,
//     name: "Oppaiiiiiii",
//     price: 19.99,
//     imageUrl: "/api/placeholder/200/200",
//   },
// ];

// export default function Shop() {
//   const [data, setData] = useState<AboutData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("http://localhost:3310/api/jewelry");
//       if (response.ok) {
//         const result: AboutData = await response.json();
//         setData(result);
//       } else {
//         setError("Erreur lors de la récupération des données.");
//       }
//       setLoading(false);
//     };

//     fetchData().catch(() => {
//       setError("Erreur lors de la récupération des données.");
//       setLoading(false);
//     });
//   }, []);

//   if (!data) return <p>Aucun bijoux trouvé.</p>;

//   if (loading) {
//     return <p>Chargement...</p>;
//   }

//   if (error) {
//     return <p>Une erreur est survenue lors du chargement des données.</p>;
//   }

//   return (
//     <section className="shop-container">
//       <h2>Shop by.Nouchka</h2>

//       <ul className="products-grid">
//         {data.map((_jewelry) => (
//           <li key={_jewelry.id} className="product-card">
//             <img
//               src={_jewelry.imageUrl}
//               alt={item.name}
//               className="product-image"
//             />
//             <h3>{item.name}</h3>
//             <p className="price">{item.price.toFixed(2)} €</p>
//             {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
//             <button className="add-to-cart">Ajouter au panier</button>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }
