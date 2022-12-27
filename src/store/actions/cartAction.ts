import { Cart, CartDispatch } from "../../types/cart";

export const addToCart = (cart: Cart) => (dispatch: CartDispatch) => {
  dispatch({ type: "ADD_TO_CART", payload: cart });
};

export const removeFromCart = (id: string) => (dispatch: CartDispatch) => {
  dispatch({ type: "REMOVE_FROM_CART", payload: id });
};

export const decreaseProductQuantity =
  (id: string) => (dispatch: CartDispatch) => {
    dispatch({ type: "DECREASE_PRODUCT_QUANTITY", payload: id });
  };

export const increaseProductQuantity =
  (id: string) => (dispatch: CartDispatch) => {
    dispatch({ type: "INCREASE_PRODUCT_QUANTITY", payload: id });
  };
