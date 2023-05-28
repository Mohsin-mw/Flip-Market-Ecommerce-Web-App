import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
} from "../User/UserSlice";
import { UserLogin } from "../../../network/endpoints/User";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());
    const { data } = UserLogin(email, password);
    dispatch(userLoginSuccess(data));
    localStorage.setItem("User", JSON.stringify(data));
  } catch (error) {
    dispatch(userLoginFail(error));
  }
};
