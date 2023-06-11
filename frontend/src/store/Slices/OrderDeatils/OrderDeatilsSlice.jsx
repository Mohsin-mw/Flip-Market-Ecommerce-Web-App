import { createSlice } from "@reduxjs/toolkit";

const OrderDeatils = createSlice({
  name: "OrderDetails",
  initialState: {
    orderItems: [],
    shippingAddress: {},
  },
  reducers: {
    orderRequest: (state, action) => {
      return { ...state, orderItems: action.payload };
    },
    orderFailed: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { orderRequest, orderFailed } = OrderDeatils.actions;
export default OrderDeatils.reducer;
