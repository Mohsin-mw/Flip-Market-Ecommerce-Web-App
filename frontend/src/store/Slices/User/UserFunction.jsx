import { LoginUser } from "../../../network/endpoints/User";
import { userLoginRequest, userLoginSuccess, userLoginFail } from "./UserSlice";

export const UserLogin = async (dispatch, email, password) => {
  try {
    dispatch(userLoginRequest());
    console.log("userLogin email", email);
    console.log("userLogin password", password);
    const { data } = await LoginUser(email, password);
    dispatch(userLoginSuccess(data));
  } catch (error) {
    console.log(error.response.data);
    dispatch(userLoginFail(error.response.data.detail));
  }
};
