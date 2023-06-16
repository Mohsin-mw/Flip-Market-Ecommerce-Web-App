import { axiosClient, axiosClientWithToken } from "../ApiClient";

export function getProducts() {
  return axiosClient().get("/products", { timeout: 3000 });
}

export function getProduct(id) {
  return axiosClient().get(`/products/${id}`, { timeout: 3000 });
}

export function getProductByCategory(category) {
  return axiosClient().get(`/products/category/${category}`, { timeout: 3000 });
}

export function getAllCategoriesList() {
  return axiosClient().get("/products/allcategories");
}

export function DeleteProduct(token, id) {
  return axiosClientWithToken(token).delete(`/products/delete/${id}/`);
}

export function CreateProduct(token) {
  return axiosClientWithToken(token).post("/products/create/");
}

export function UpdateProduct(token, id, product) {
  return axiosClientWithToken(token).put(`/products/update/${id}/`, product);
}

export function AddReview(token, id, review) {
  return axiosClientWithToken(token).post(`/products/${id}/reviews/`, review);
}
