import { createSlice, current } from "@reduxjs/toolkit";

const loadCartItems = () => {
  const data = localStorage.getItem("cartItems");
  const cartItemsFromStorage = data ? JSON.parse(data) : [];
  return cartItemsFromStorage;
};

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartItems: loadCartItems(),
  },
  reducers: {
    addCartItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    addCartItemToLocalStorage: (state, action) => {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(current(state.cartItems))
      );
    },
  },
});

export const { addCartItem, addCartItemToLocalStorage } = CartSlice.actions;
export default CartSlice.reducer;
