import {
  getProducts,
  getProductsElectronics,
  getProductsPhones,
  getProductsLaptops,
} from "../../../network/endpoints/Products";
import {
  productListRequest,
  productListSucccess,
  requestProductFail,
} from "./ProductSlice";

const listProducts = async (dispatch, category) => {
  try {
    dispatch(productListRequest());
    if (category == "all") {
      await getProducts()
        .then((response) => {
          dispatch(productListSucccess(response.data));
        })
        .catch((error) => {
          dispatch(requestProductFail("Request timed out"));
        });
    } else if (category == "electronics") {
      await getProductsElectronics()
        .then((response) => {
          dispatch(productListSucccess(response.data));
        })
        .catch((error) => {
          dispatch(requestProductFail("Request timed out"));
        });
    } else if (category == "phones") {
      await getProductsPhones()
        .then((response) => {
          dispatch(productListSucccess(response.data));
        })
        .catch((error) => {
          dispatch(requestProductFail("Request timed out"));
        });
    } else if (category == "laptops") {
      await getProductsLaptops()
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
