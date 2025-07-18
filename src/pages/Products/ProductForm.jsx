import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  createProduct,
  updateProduct,
  buscarProdutoPorID,
} from "../../api/apiService";

const ProductForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const loadProduct = async () => {
        try {
          const data = await buscarProdutoPorID(id);
          setValue("name", data.name);
          setValue("price", data.price);
          setValue("category", data.category);
        } catch (error) {
          console.error("Erro ao buscar produto:", error);
        }
      };
      loadProduct();
    } else {
      reset(); // se for novo, limpa o form
    }
  }, [id, isEdit, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }
      navigate("/admin"); // volta pra lista de produtos
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Editar Produto" : "Cadastrar Produto"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          placeholder="Nome do produto"
        />
        <input
          {...register("price", { required: true })}
          placeholder="Preço"
          type="number"
          step="0.01"
        />
        <input
          {...register("category", { required: true })}
          placeholder="Categoria"
        />
        <button type="submit">{isEdit ? "Atualizar" : "Cadastrar"}</button>
        <button type="button" onClick={() => navigate("/admin")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
