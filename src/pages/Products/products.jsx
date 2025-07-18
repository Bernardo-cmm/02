import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProductById,
} from "../../api/apiService";

const Products = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [editingId, setEditingId] = useState(null);

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

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await updateProduct(editingId, data);
        setEditingId(null);
      } else {
        await createProduct(data);
      }
      fetchProducts();
      reset();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const startEdit = (product) => {
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("category", product.category);
    setEditingId(product.id);
  };

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
                <button onClick={() => startEdit(product)}>Editar</button>
              </li>
            ))}
      </ul>

      <h3>{editingId ? "Editar Produto" : "Cadastrar Novo Produto"}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} placeholder="Nome" />
        <input
          {...register("price", { required: true })}
          placeholder="Preço"
          type="number"
        />
        <input
          {...register("category", { required: true })}
          placeholder="Categoria"
        />
        <button type="submit">{editingId ? "Atualizar" : "Cadastrar"}</button>
        {editingId && (
          <button
            type="button"
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
