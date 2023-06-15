import { axiosClientWithToken } from "../ApiClient";

export function PlaceOrder(token, order) {
  return axiosClientWithToken(token).post("/orders/add/", order);
}

export function GetOrderDetails(token, id) {
  return axiosClientWithToken(token).get(`/orders/${id}`);
}

export function GetAllOrders(token, user) {
  return axiosClientWithToken(token).get("/orders/allorders/", user, {
    validateStatus: () => true,
  });
}

export function GetAllAdminOders(token) {
  return axiosClientWithToken(token).get("/orders/");
}

export function UpdatePayment(token, id, method) {
  return axiosClientWithToken(token).put(`/orders/paid/${id}/${method}/`);
}

export function UpdateDeliverey(token, id, method) {
  return axiosClientWithToken(token).put(`/orders/delivered/${id}/${method}/`);
}
