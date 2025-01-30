import { useParams } from "react-router-dom";
import Product from "../../../components/Product/index";

export default function ProductPage() {
  const { id } = useParams();
  return (
    <>
      <Product jewelryId={id} />
    </>
  );
}
