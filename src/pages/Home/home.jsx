import React, { useEffect, useState } from "react";

import { getProducts } from "../../api/apiService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const product = await getProducts();
      setProducts(product);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (loading) return <div>Carregando...</div>;
  return (
    <div style={{ marginTop: "20rem" }}>
      <h2>Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - R$ {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
