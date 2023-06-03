import { UpdateUserDetails } from "../../../network/endpoints/User";
import { useSelector } from "react-redux";
import {
  userProfileUpdateRequest,
  userProfileUpdateFail,
  userProfileUpdateReset,
  userProfileUpdateSuccess,
} from "./UserUpdate";
import { userLoginSuccess } from "../User/UserSlice";
export const UserDetialsUpdate = async (dispatch, token, user) => {
  try {
    dispatch(userProfileUpdateRequest());
    const { data } = await UpdateUserDetails(token, user);
    dispatch(userProfileUpdateSuccess(data));
    dispatch(userLoginSuccess(data));
  } catch (error) {
    dispatch(userProfileUpdateFail(error));
  }
};
