import { createSlice } from "@reduxjs/toolkit";

const singleProductSlice = createSlice({
  name: "SingleProduct",
  initialState: {
    product: {
      reviews: [],
    },
  },
  reducers: {
    productRequest: (state, action) => {
      return { ...state };
    },
    productSucccess: (state, action) => {
      return { product: action.payload };
    },
    productFail: (state, action) => {
      return { error: action.payload };
    },
  },
});

export const { productRequest, productSucccess, productFail } =
  singleProductSlice.actions;
export default singleProductSlice.reducer;
