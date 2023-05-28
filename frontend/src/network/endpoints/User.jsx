import { axiosClient } from "../ApiClient";

export function LoginUser(email, password) {
  return axiosClient().post("/users/login/", {
    username: email,
    password: password,
  });
}
