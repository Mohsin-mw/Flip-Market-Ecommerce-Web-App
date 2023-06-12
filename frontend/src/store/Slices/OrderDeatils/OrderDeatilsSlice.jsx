import { createSlice } from "@reduxjs/toolkit";

const OrderDeatils = createSlice({
  name: "OrderDetails",
  initialState: {
    orderItems: [],
  },
  reducers: {
    orderRequest: (state, action) => {
      return { orderItems: action.payload };
    },
    orderFailed: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { orderRequest, orderFailed } = OrderDeatils.actions;
export default OrderDeatils.reducer;
