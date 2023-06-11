import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "Order",
  initialState: {},
  reducers: {
    orderRequest: (state, action) => {
      return {};
    },
    orderSuccess: (state, action) => {
      return { success: true, order: action.payload };
    },
    orderFailed: (state, action) => {
      return { error: action.payload };
    },
  },
});

export const { orderRequest, orderSuccess, orderFailed } = orderSlice.actions;
export default orderSlice.reducer;
