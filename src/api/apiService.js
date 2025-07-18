import { api } from "./api";



export const loginUser = (credentials) => api.post("/login", credentials);


// Produtos
export const getProducts = async () => {
    const { data } = await api.get("/products");
    return data
}



export const createProduct = async (data) => {
  const res = await api.post("/products", data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};
export const buscarProdutoPorID = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data
}


export const deleteProductById = async (id) => {
    const { data} = await api.delete(`/products/${id}`);
    return data
  };
