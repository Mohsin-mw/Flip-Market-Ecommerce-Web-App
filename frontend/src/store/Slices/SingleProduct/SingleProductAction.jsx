import { getProduct } from "../../../network/endpoints/Products";

import {
  productRequest,
  productSucccess,
  productFail,
} from "./SingleProductSlice";

const productDetail = async (dispatch, product_id) => {
  dispatch(productRequest());
  try {
    await getProduct(product_id)
      .then((response) => {
        dispatch(productSucccess(response.data));
      })
      .catch((error) => {
        dispatch(productFail("Error: " + error.message));
      });
  } catch (error) {}
};

export default productDetail;
