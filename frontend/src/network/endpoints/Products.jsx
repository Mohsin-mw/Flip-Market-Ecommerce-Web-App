import { axiosClient } from "../ApiClient";

export function getProducts() {
  return axiosClient().get("/products", { timeout: 3000 });
}

export function getProduct(id) {
  return axiosClient().get(`/products/${id}`, { timeout: 3000 });
}

export function getProductsElectronics() {
  return axiosClient().get("/products/electronics", { timeout: 3000 });
}

export function getProductsPhones() {
  return axiosClient().get("/products/phones", { timeout: 3000 });
}

export function getProductsLaptops() {
  return axiosClient().get("/products/laptops", { timeout: 3000 });
}
