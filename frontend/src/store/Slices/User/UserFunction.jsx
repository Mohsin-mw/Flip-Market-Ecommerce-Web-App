import { LoginUser } from "../../../network/endpoints/User";
import { userLoginRequest, userLoginSuccess, userLoginFail } from "./UserSlice";

export const UserLogin = async (dispatch, email, password) => {
  try {
    dispatch(userLoginRequest());
    const { data } = await LoginUser(email, password);
    dispatch(userLoginSuccess(data));
  } catch (error) {
    console.log(error.response.data);
    dispatch(userLoginFail(error.response.data.detail));
  }
};
