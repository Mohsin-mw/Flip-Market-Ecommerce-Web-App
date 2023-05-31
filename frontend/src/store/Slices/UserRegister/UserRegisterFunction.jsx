import { RegisterUser } from "../../../network/endpoints/User";
import {
  userRegisterSuccess,
  userRegisterRequest,
  userRegisterFail,
} from "./UserRegister";

export const UserRegister = async (dispatch, name, email, password) => {
  try {
    dispatch(userRegisterRequest());
    const { data } = await RegisterUser(name, email, password);
    dispatch(userRegisterSuccess(data));
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch(userRegisterFail(error.response.data.detail));
  }
};
