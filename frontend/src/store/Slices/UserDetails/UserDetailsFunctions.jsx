import { GetUserDetails } from "../../../network/endpoints/User";
import { useSelector } from "react-redux";
import {
  userDetailsSuccess,
  userDetailsRequest,
  userDetailsFail,
} from "./UserDetails";

export const GetUserDetials = async (dispatch, id, token) => {
  try {
    dispatch(userDetailsRequest());
    const { data } = await GetUserDetails(token, id);
    dispatch(userDetailsSuccess(data));
  } catch (error) {
    dispatch(userDetailsFail(error));
  }
};
