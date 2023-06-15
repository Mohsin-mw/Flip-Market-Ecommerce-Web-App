import { axiosClientWithToken } from "../ApiClient";

export function PlaceOrder(token, order) {
  return axiosClientWithToken(token).post("/orders/add/", order);
}

export function GetOrderDetails(token, id) {
  return axiosClientWithToken(token).get(`/orders/${id}`);
}

export function GetAllOrders(token, user) {
  return axiosClientWithToken(token).get("/orders/allorders/", user);
}

export function GetAllAdminOders(token) {
  return axiosClientWithToken(token).get("/orders/");
}
