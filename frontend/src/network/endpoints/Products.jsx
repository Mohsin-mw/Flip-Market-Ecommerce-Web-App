import { axiosClient } from "../ApiClient";

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
