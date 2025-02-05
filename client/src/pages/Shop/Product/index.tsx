import { useParams } from "react-router-dom";
import Product from "../../../components/Product/index";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <p>Produit non trouvé</p>;
  }
  return <Product jewelryId={id} />;
}
