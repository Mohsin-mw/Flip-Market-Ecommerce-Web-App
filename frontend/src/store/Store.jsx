import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Slices/Product/ProductSlice";
import AppReducer from "./Slices/App/AppSlice";
import SingleProduct from "./Slices/SingleProduct/SingleProductSlice";
import CartReducer from "./Slices/Cart/CartSlice";
import UserReducer from "./Slices/User/UserSlice";

export const store = configureStore({
  reducer: {
    app: AppReducer,
    productList: ProductReducer,
    singleProduct: SingleProduct,
    cart: CartReducer,
    user: UserReducer,
  },
});
