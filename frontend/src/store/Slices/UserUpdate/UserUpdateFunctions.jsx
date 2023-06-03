import { UpdateUser } from "../../../network/endpoints/User";
import { useSelector } from "react-redux";
import {
  userUpdateSuccess,
  userUpdateRequest,
  userUpdateFail,
} from "./UserUpdate";

export const UserDetialsUpdate = async (dispatch, id, token) => {
  try {
    dispatch(userUpdateRequest());
    const { data } = await UpdateUser(token, id);
    dispatch(userUpdateSuccess(data));
  } catch (error) {
    dispatch(userUpdateFail(error.response.data.detail));
  }
};
