import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getProducts, deleteProductById } from "../../api/apiService";
import styles from "./products.module.css";

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gerenciar Produtos</h2>
        <Link to="/produtos/novo" className={styles.addButton}>
          Novo Produto
        </Link>
      </div>

      <input
        className={styles.filterInput}
        placeholder="Filtrar por nome"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul className={styles.productList}>
        {Array.isArray(products) &&
          products
            .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
            .map((product) => (
              <li key={product.id} className={styles.productItem}>
                <div className={styles.productInfo}>
                  <span className={styles.name}>{product.name}</span>
                  <span className={styles.price}>R$ {product.price}</span>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(product.id)}
                  >
                    Excluir
                  </button>
                  <Link to={`/produtos/editar/${product.id}`}>
                    <button className={styles.editButton}>Editar</button>
                  </Link>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Products;
