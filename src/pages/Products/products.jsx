import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Products = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSubmit = (data) => {
    if (editingId) {
      axios
        .put(`http://localhost:3000/products/${editingId}`, data)
        .then(() => {
          fetchProducts();
          reset();
          setEditingId(null);
        });
    } else {
      axios.post("http://localhost:3000/products", data).then(() => {
        fetchProducts();
        reset();
      });
    }
  };

  const deleteProduct = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      axios.delete(`http://localhost:3000/products/${id}`).then(fetchProducts);
    }
  };

  const startEdit = (product) => {
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("category", product.category);
    setEditingId(product.id);
  };

  return (
    <div>
      <h2>Gerenciar Produtos</h2>

      <input
        placeholder="Filtrar por nome"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul>
        {products
          .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
          .map((product) => (
            <li key={product.id}>
              {product.name} - R$ {product.price}
              <button onClick={() => deleteProduct(product.id)}>Excluir</button>
              <button onClick={() => startEdit(product)}>Editar</button>
            </li>
          ))}
      </ul>

      <h3>{editingId ? "Editar Produto" : "Cadastrar Novo Produto"}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} placeholder="Nome" />
        <input {...register("price", { required: true })} placeholder="Preço" />
        <input
          {...register("category", { required: true })}
          placeholder="Categoria"
        />
        <button type="submit">{editingId ? "Atualizar" : "Cadastrar"}</button>
        {editingId && (
          <button
            onClick={() => {
              reset();
              setEditingId(null);
            }}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default Products;
