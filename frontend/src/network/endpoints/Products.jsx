import { axiosClient } from "../ApiClient";

export function getProducts() {
  return axiosClient().get("/products", { timeout: 100 });
}

export function getProduct(id) {
  return axiosClient().get(`/product/${id}`, { timeout: 100 });
}
