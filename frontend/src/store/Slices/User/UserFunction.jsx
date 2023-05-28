import { LoginUser } from "../../../network/endpoints/User";
import { userLoginRequest, userLoginSuccess, userLoginFail } from "./UserSlice";

export const UserLogin = async (dispatch, email, password) => {
  try {
    dispatch(userLoginRequest());
    const { data } = await LoginUser(email, password);
    dispatch(userLoginSuccess(data));
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch(userLoginFail(error.response.data.detail));
  }
};
