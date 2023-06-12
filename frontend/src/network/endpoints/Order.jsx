import { axiosClientWithToken } from "../ApiClient";

export function PlaceOrder(token, order) {
  return axiosClientWithToken(token).post("/orders/add/", order);
}

export function GetOrderDetails(token, id) {
  return axiosClientWithToken(token).get(`/orders/${id}/`);
}
