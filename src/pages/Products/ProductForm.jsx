import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  createProduct,
  updateProduct,
  buscarProdutoPorID,
} from "../../api/apiService";
import styles from "./ProductForm.module.css";

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
      reset();
    }
  }, [id, isEdit, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }
      navigate("/admin");
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>
          {isEdit ? "Editar Produto" : "Cadastrar Produto"}
        </h2>

        <input
          className={styles.input}
          {...register("name", { required: true })}
          placeholder="Nome do produto"
        />
        <input
          className={styles.input}
          {...register("price", { required: true })}
          placeholder="Preço"
          type="number"
          step="0.01"
        />
        <input
          className={styles.input}
          {...register("urlImage", { required: true })}
          placeholder="Url da imagem"
          type="text"
        />
        <input
          className={styles.input}
          {...register("category", { required: true })}
          placeholder="Categoria"
        />

        <div className={styles.buttons}>
          <button
            type="submit"
            className={`${styles.button} ${styles.submitButton}`}
          >
            {isEdit ? "Atualizar" : "Cadastrar"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
