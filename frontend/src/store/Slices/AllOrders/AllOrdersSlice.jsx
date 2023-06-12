import { createSlice } from "@reduxjs/toolkit";

const OrderDeatilsAll = createSlice({
  name: "OrderDetailsAll",
  initialState: {
    orderItems: [],
  },
  reducers: {
    orderDetailsAll: (state, action) => {
      return { orderItems: action.payload };
    },
    orderDetailsAllFailed: (state, action) => {
      return { ...state, error: action.payload };
    },
    orderDetailsReset: (state, action) => {
      return { orderItems: [] };
    },
  },
});

export const { orderDetailsAll, orderDetailsAllFailed, orderDetailsReset } =
  OrderDeatilsAll.actions;
export default OrderDeatilsAll.reducer;
