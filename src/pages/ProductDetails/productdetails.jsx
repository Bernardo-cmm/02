import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Erro ao buscar produto:", err));
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Preço: R$ {product.price}</p>
      <p>Categoria: {product.category}</p>
    </div>
  );
};

export default ProductDetails;
