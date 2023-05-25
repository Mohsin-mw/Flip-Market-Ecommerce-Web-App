import { createSlice } from "@reduxjs/toolkit";
const productListSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
  },
  reducers: {
    productListRequest: (state, action) => {
      return { products: [] };
    },
    productListSucccess: (state, action) => {
      return { products: action.payload };
    },
    requestProductFail: (state, action) => {
      return { error: action.payload };
    },
  },
});

export const { productListRequest, productListSucccess, requestProductFail } =
  productListSlice.actions;
export default productListSlice.reducer;
