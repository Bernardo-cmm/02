import { api } from "./api";



export const loginUser = (credentials) => api.post("/login", credentials);


// Produtos
export const getProducts = async () => {
    const { data } = await api.get("/products");
    return data
}



export const createProduct = async (productData) => {
    const { data } = await api.post("/products", productData);
    return data;
  };
  
  
  export const updateProduct = async (id, updatedData) => {
    const { data } = await api.put(`/products/${id}`, updatedData);
    return data;
  };
export const buscarProdutoPorID = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data
}


export const deleteProductById = async (id) => {
    const { data} = await api.delete(`/products/${id}`);
    return data
  };
