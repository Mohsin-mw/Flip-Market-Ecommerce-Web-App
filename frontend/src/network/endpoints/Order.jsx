import { axiosClientWithToken } from "../ApiClient";

export function PlaceOrder(token, order) {
  return axiosClientWithToken(token).post("/orders/add/", order);
}
