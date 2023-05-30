import { getProducts } from "../../../network/endpoints/Products";
import {
  productListRequest,
  productListSucccess,
  requestProductFail,
} from "./ProductSlice";

const listProducts = async (dispatch) => {
  try {
    dispatch(productListRequest());
    await getProducts()
      .then((response) => {
        dispatch(productListSucccess(response.data));
      })
      .catch((error) => {
        dispatch(requestProductFail("Request timed out"));
      });
  } catch {}
};

export default listProducts;
