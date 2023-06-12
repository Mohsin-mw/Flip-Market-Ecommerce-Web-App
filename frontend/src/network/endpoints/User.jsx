import { axiosClient, axiosClientWithToken } from "../ApiClient";

export function LoginUser(email, password) {
  return axiosClient().post("/users/login/", {
    username: email,
    password: password,
  });
}

export function RegisterUser(name, email, password) {
  return axiosClient().post("/users/register/", {
    name: name,
    email: email,
    password: password,
  });
}

export function GetUserDetails(token, id) {
  return axiosClientWithToken(token).get(`/users/${id}`);
}

export function UpdateUserDetails(token, user) {
  return axiosClientWithToken(token).put(`/users/profile/update/`, user);
}

export default function GetAllOrders(token, user) {
  return axiosClientWithToken(token).get("/orders/allorders/", user);
}
