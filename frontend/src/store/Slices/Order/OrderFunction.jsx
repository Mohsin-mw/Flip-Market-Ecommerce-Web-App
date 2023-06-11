import { PlaceOrder } from "../../../network/endpoints/Order";
import { useSelector } from "react-redux";
import { orderRequest, orderSuccess, orderFailed } from "./OrderSlice";
export const CreateOrder = async (dispatch, token, order) => {
  try {
    dispatch(orderRequest());
    const { data } = await PlaceOrder(token, order);
    dispatch(orderSuccess(data));
  } catch (error) {
    dispatch(orderFailed(error));
  }
};
