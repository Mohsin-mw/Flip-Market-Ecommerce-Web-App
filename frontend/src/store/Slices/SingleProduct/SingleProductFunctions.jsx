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
        dispatch(productFail("Request timed out"));
      });
  } catch (error) {}
};

export default productDetail;
