import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Slices/Product/ProductSlice";
import AppReducer from "./Slices/App/AppSlice";
import SingleProduct from "./Slices/SingleProduct/SingleProductSlice";
import CartReducer from "./Slices/Cart/CartSlice";
import UserReducer from "./Slices/User/UserSlice";
import UserRegisterReducer from "./Slices/UserRegister/UserRegister";
import UserDetailsReducer from "./Slices/UserDetails/UserDetails";
import UserUpdateReducer from "./Slices/UserUpdate/UserUpdate";

export const store = configureStore({
  reducer: {
    app: AppReducer,
    productList: ProductReducer,
    singleProduct: SingleProduct,
    cart: CartReducer,
    user: UserReducer,
    userRegister: UserRegisterReducer,
    userDetails: UserDetailsReducer,
    userUpdate: UserUpdateReducer,
  },
});
