import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // ⬅️ Import necessário
import { getProducts, deleteProductById } from "../../api/apiService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProductById(id);
        fetchProducts();
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
      }
    }
  };

  return (
    <div>
      <h2>Gerenciar Produtos</h2>

      {/* 🔘 Botão para novo produto */}
      <div style={{ margin: "10px 0" }}>
        <Link to="/produtos/novo">
          <button>Novo Produto</button>
        </Link>
      </div>

      <input
        placeholder="Filtrar por nome"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul>
        {Array.isArray(products) &&
          products
            .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
            .map((product) => (
              <li key={product.id}>
                {product.name} - R$ {product.price}
                <button onClick={() => handleDelete(product.id)}>
                  Excluir
                </button>
                {/* 🔁 Botão editar com link para a rota */}
                <Link to={`/produtos/editar/${product.id}`}>
                  <button>Editar</button>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Products;
