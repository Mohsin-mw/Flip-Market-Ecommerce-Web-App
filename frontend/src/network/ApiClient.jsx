import axios from "axios";
import { store } from "../store/Store";

export function axiosClient() {
  const { app } = store.getState();
  return axios.create({
    baseURL: app.apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function axiosClientWithToken(token) {
  const { app } = store.getState();
  return axios.create({
    baseURL: app.apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
