import { axiosClient } from "../ApiClient";

export function UserLogin(email, password) {
  return axiosClient().post("/api/users/login/", {
    username: email,
    password: password,
  });
}
