import { axiosClient } from "../ApiClient";

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
