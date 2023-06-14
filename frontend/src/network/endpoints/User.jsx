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

export function GetAllUsers(token) {
  return axiosClientWithToken(token).get("/users");
}

export function DeleteUser(token, id) {
  return axiosClientWithToken(token).delete(`/users/delete/${id}/`);
}

export function GetUser(token, id) {
  return axiosClientWithToken(token).get(`/users/${id}`);
}

export function UpdateUser(token, id, user) {
  return axiosClientWithToken(token).put(`/users/update/${id}/`, user);
}
