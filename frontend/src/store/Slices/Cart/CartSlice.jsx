import { createSlice, current } from "@reduxjs/toolkit";

const loadCartItems = () => {
  const data = localStorage.getItem("cartItems");
  const cartItemsFromStorage = data ? JSON.parse(data) : [];
  return cartItemsFromStorage;
};

const loadShippingAddress = () => {
  const data = localStorage.getItem("shippingAddress");
  const shippingAddressFromStorage = data ? JSON.parse(data) : {};
  return shippingAddressFromStorage;
};

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartItems: loadCartItems(),
    shippingAddress: loadShippingAddress(),
    paymentMethod: "",
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
    removeCartItem: (state, action) => {
      const itemToBeRemoved = action.payload;
      const currentState = current(state);
      const newCartList = currentState.cartItems.filter(
        (item) => itemToBeRemoved.product !== item.product
      );
      return {
        ...state,
        cartItems: newCartList,
      };
    },
    addCartItemToLocalStorage: (state, action) => {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(current(state.cartItems))
      );
    },
    resetCartItems: (state, action) => {
      localStorage.removeItem("cartitems");
      return {
        cartItems: [],
      };
    },
    addShippingAddress: (state, action) => {
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        shippingAddress: action.payload,
      };
    },
    resetShippingAddress: (state, action) => {
      localStorage.removeItem("shippingAddress");
      return {
        ...state,
        shippingAddress: {},
      };
    },
    savePaymentMethod: (state, action) => {
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
      return {
        ...state,
        paymentMethod: action.payload,
      };
    },
  },
});

export const {
  addCartItem,
  addCartItemToLocalStorage,
  removeCartItem,
  resetCartItems,
  addShippingAddress,
  resetShippingAddress,
  savePaymentMethod,
} = CartSlice.actions;
export default CartSlice.reducer;
