import { Cart, CartAction, CartState } from "../../types/cart";

const defaultState: CartState = [];

const cartReducer = (state: CartState = defaultState, action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter((cart) => cart.product.id !== action.payload);
    case "INCREASE_PRODUCT_QUANTITY":
      return state.map((cart) => {
        if (cart.product.id === action.payload) cart.quantity++;
        return cart;
      });
    case "DECREASE_PRODUCT_QUANTITY":
      return state.map((cart) => {
        if (cart.product.id === action.payload) cart.quantity--;
        return cart;
      });

    default:
      return state;
  }
};

export default cartReducer;
