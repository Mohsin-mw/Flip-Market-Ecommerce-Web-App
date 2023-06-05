import {
  getProducts,
  getProductByCategory,
} from "../../../network/endpoints/Products";
import {
  productListRequest,
  productListSucccess,
  requestProductFail,
} from "./ProductSlice";

const listProducts = async (dispatch, category) => {
  try {
    dispatch(productListRequest());
    if (category == "All") {
      await getProducts()
        .then((response) => {
          dispatch(productListSucccess(response.data));
        })
        .catch((error) => {
          dispatch(requestProductFail("Request timed out"));
        });
    } else {
      await getProductByCategory(category)
        .then((response) => {
          dispatch(productListSucccess(response.data));
        })
        .catch((error) => {
          dispatch(requestProductFail("Request timed out"));
        });
    }
  } catch {}
};

export default listProducts;
