import { addCartItem, addCartItemToLocalStorage } from "./CartSlice";
import { getProduct } from "../../../network/endpoints/Products";

export const addToCart = async (dispatch, id, qty) => {
  const { data } = await getProduct(id);
  dispatch(
    addCartItem({
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    })
  );
  dispatch(addCartItemToLocalStorage());
};
